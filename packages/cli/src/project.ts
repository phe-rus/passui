import {
    lstat,
    mkdir,
    readFile,
    readdir,
    writeFile,
} from "node:fs/promises"
import {
    basename,
    dirname,
    join,
    resolve,
    relative,
    sep,
} from "node:path"
import { spawn } from "node:child_process"
import {
    setupFiles,
    starterFiles,
    versions,
} from "./templates"
import { solidVersions } from "./solid-templates"

export type PackageManager = "bun" | "npm" | "pnpm" | "yarn"
export type Options = {
    framework?: "react" | "solid"
    directory: string
    command: "init" | "create"
    template: "vite" | "tanstack"
    integration: boolean
    manager?: PackageManager
    install: boolean
    dryRun: boolean
}
type Manifest = {
    packageManager?: string
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    [key: string]: unknown
}
export type Plan = {
    root: string
    files: Record<string, string>
    manager: PackageManager
    framework: string
    originals: Record<string, string | null>
}

async function stat(path: string) {
    try {
        return await lstat(path)
    } catch (error) {
        if (
            (error as NodeJS.ErrnoException).code === "ENOENT"
        )
            return null
        throw error
    }
}

async function checkPath(root: string, path: string) {
    const target = resolve(root, path)
    if (
        relative(root, target).startsWith(`..${sep}`) ||
        target === root
    ) {
        throw new Error(`Invalid generated path: ${path}`)
    }
    let current = target
    while (true) {
        const entry = await stat(current)
        if (entry?.isSymbolicLink())
            throw new Error(`Refusing symlink: ${current}`)
        if (
            entry &&
            current !== target &&
            !entry.isDirectory()
        )
            throw new Error(`Not a directory: ${current}`)
        if (dirname(current) === current) break
        current = dirname(current)
    }
}

export async function detectManager(
    root: string,
    manifest: Manifest
): Promise<PackageManager> {
    const configured = manifest.packageManager?.split("@")[0]
    if (
        configured === "bun" ||
        configured === "npm" ||
        configured === "pnpm" ||
        configured === "yarn"
    )
        return configured
    for (const [file, manager] of [
        ["bun.lock", "bun"],
        ["bun.lockb", "bun"],
        ["pnpm-lock.yaml", "pnpm"],
        ["yarn.lock", "yarn"],
        ["package-lock.json", "npm"],
    ] as const) {
        if (await stat(join(root, file))) return manager
    }
    return "bun"
}

function requireMajor(
    name: string,
    version: string | undefined,
    major: number
) {
    if (!version) return
    const match = version.match(/^[~^]?(\d+)(?:\.|$)/)
    if (match && Number(match[1]) !== major) {
        throw new Error(
            `${name} ${version} is incompatible. Passui requires ${name} ${major}; upgrade explicitly before running init.`
        )
    }
}

export async function planProject(
    options: Options
): Promise<Plan> {
    const root = resolve(options.directory)
    await checkPath(root, "package.json")
    let manifest: Manifest = {}
    let files: Record<string, string>
    let framework: string = `${options.framework ?? "react"}/${options.template}`
    if (options.command === "create") {
        const entry = await stat(root)
        if (
            entry &&
            (!entry.isDirectory() ||
                (await readdir(root)).length)
        )
            throw new Error(
                `Create needs an empty directory: ${root}`
            )
        const name =
            basename(root)
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "-")
                .replace(/^-+/, "") || "passui-app"
        files = starterFiles(
            name,
            options.template,
            options.framework
        )
    } else {
        try {
            manifest = JSON.parse(
                await readFile(
                    join(root, "package.json"),
                    "utf8"
                )
            )
        } catch {
            throw new Error(
                `init needs a valid package.json in ${root}`
            )
        }
        if (
            !manifest ||
            typeof manifest !== "object" ||
            Array.isArray(manifest)
        )
            throw new Error(
                "package.json must contain an object"
            )
        const dependencies = {
            ...manifest.devDependencies,
            ...manifest.dependencies,
        }
        const detected = dependencies["solid-js"]
            ? "solid"
            : dependencies.react
              ? "react"
              : undefined
        if (
            !options.framework &&
            dependencies["solid-js"] &&
            dependencies.react
        )
            throw new Error(
                "Both React and Solid are installed. Choose --framework react or --framework solid."
            )
        const frameworkType = options.framework ?? detected
        if (
            !frameworkType ||
            !dependencies[
                frameworkType === "solid"
                    ? "solid-js"
                    : frameworkType
            ]
        )
            throw new Error(
                "No matching React or Solid dependency found. Run init in the application workspace."
            )
        if (frameworkType === "react") {
            requireMajor("react", dependencies.react, 19)
            requireMajor(
                "react-dom",
                dependencies["react-dom"],
                19
            )
        } else
            requireMajor(
                "solid-js",
                dependencies["solid-js"],
                1
            )
        requireMajor(
            "tailwindcss",
            dependencies.tailwindcss,
            4
        )
        framework =
            frameworkType === "react" && dependencies.next
                ? "next"
                : dependencies[
                        `@tanstack/${frameworkType}-start`
                    ]
                  ? "tanstack"
                  : dependencies.vite
                    ? "vite"
                    : frameworkType
        const runtime = { ...manifest.dependencies }
        const dev = { ...manifest.devDependencies }
        const add = (
            target: Record<string, string>,
            name: string,
            version: string
        ) => {
            if (!dependencies[name]) target[name] = version
        }
        add(
            runtime,
            frameworkType === "solid"
                ? "@passui/solid"
                : "@passui/react",
            frameworkType === "solid"
                ? solidVersions.passui
                : versions.passui
        )
        if (frameworkType === "react")
            add(runtime, "react-dom", versions.react)
        add(dev, "tailwindcss", versions.tailwind)
        if (options.integration) {
            add(
                runtime,
                "@passui/tanstack",
                versions.integration
            )
            if (frameworkType === "solid") {
                add(
                    runtime,
                    "@tanstack/solid-query",
                    solidVersions.query
                )
                add(
                    runtime,
                    "@tanstack/solid-form",
                    solidVersions.form
                )
                add(
                    runtime,
                    "@tanstack/solid-router",
                    solidVersions.router
                )
                add(
                    runtime,
                    "@tanstack/solid-table",
                    solidVersions.table
                )
            } else
                add(
                    runtime,
                    "@tanstack/react-query",
                    "^5.104.0"
                )
        }
        if (
            options.integration &&
            frameworkType === "react"
        ) {
            for (const [name, version] of Object.entries({
                "@tanstack/react-form": "^1.33.5",
                "@tanstack/react-table": "^9.2.4",
                "@tanstack/react-router": "^1.170.39",
                "@tanstack/react-devtools": "^0.10.13",
                "@tanstack/react-query-devtools": "^5.104.0",
                "@tanstack/react-router-devtools": "^1.167.2",
                "@hugeicons/react": "^1.1.10",
                motion: "^13.4.4",
            }))
                add(runtime, name, version)
        }
        add(
            dev,
            framework === "vite" || framework === "tanstack"
                ? "@tailwindcss/vite"
                : "@tailwindcss/postcss",
            versions.tailwind
        )
        manifest = {
            ...manifest,
            dependencies: runtime,
            devDependencies: dev,
        }
        files = {
            ...setupFiles(
                framework,
                options.integration,
                frameworkType
            ),
            "package.json": `${JSON.stringify(manifest, null, 4)}\n`,
        }
    }
    const manager =
        options.manager ??
        (await detectManager(root, manifest))
    const changed: Record<string, string> = {}
    const originals: Record<string, string | null> = {}
    for (const [path, content] of Object.entries(files)) {
        await checkPath(root, path)
        const entry = await stat(join(root, path))
        originals[path] = null
        if (entry) {
            if (!entry.isFile())
                throw new Error(`Not a file: ${path}`)
            const old = await readFile(
                join(root, path),
                "utf8"
            )
            originals[path] = old
            if (old === content) continue
            if (path !== "package.json")
                throw new Error(
                    `Existing file differs: ${path}. Move it aside or merge the setup manually.`
                )
        }
        changed[path] = content
    }
    return {
        root,
        files: changed,
        manager,
        framework,
        originals,
    }
}

export async function writePlan(plan: Plan) {
    for (const path of Object.keys(plan.files)) {
        await checkPath(plan.root, path)
        const entry = await stat(join(plan.root, path))
        const current = entry?.isFile()
            ? await readFile(join(plan.root, path), "utf8")
            : null
        if (
            (entry && !entry.isFile()) ||
            current !== plan.originals[path]
        ) {
            throw new Error(
                `Project changed after planning: ${path}. Run setup again.`
            )
        }
    }
    for (const [path, content] of Object.entries(
        plan.files
    )) {
        await checkPath(plan.root, path)
        await mkdir(dirname(join(plan.root, path)), {
            recursive: true,
        })
        await writeFile(join(plan.root, path), content, {
            flag: plan.originals[path] === null ? "wx" : "w",
        })
    }
}

export async function installProject(
    root: string,
    manager: PackageManager
) {
    await new Promise<void>((accept, reject) => {
        const child = spawn(manager, ["install"], {
            cwd: root,
            stdio: "inherit",
            shell: false,
        })
        child.on("error", () =>
            reject(
                new Error(
                    `Could not start ${manager}. Files are ready; install dependencies manually.`
                )
            )
        )
        child.on("exit", (code) =>
            code === 0
                ? accept()
                : reject(
                      new Error(
                          `${manager} install failed. Files are ready; retry installation in ${root}.`
                      )
                  )
        )
    })
}
