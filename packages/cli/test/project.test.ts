import { afterEach, describe, expect, test } from "vitest"
import {
    mkdtemp,
    readFile,
    writeFile,
    mkdir,
    symlink,
    readdir,
    rm,
} from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
    detectManager,
    planProject,
    writePlan,
    type Options,
} from "../src/project"

const directories: string[] = []
async function fixture(
    dependencies: Record<string, string> = {
        react: "^19.3.0",
        vite: "^8.3.1",
    }
) {
    const root = await mkdtemp(
        join(tmpdir(), "passui-cli-test-")
    )
    directories.push(root)
    await writeFile(
        join(root, "package.json"),
        JSON.stringify({
            name: "existing",
            scripts: { dev: "custom" },
            dependencies,
        })
    )
    return root
}
function options(
    directory: string,
    overrides: Partial<Options> = {}
): Options {
    return {
        directory,
        command: "init",
        template: "vite",
        integration: false,
        install: false,
        dryRun: false,
        ...overrides,
    }
}
afterEach(async () => {
    await Promise.all(
        directories
            .splice(0)
            .map((path) =>
                rm(path, { recursive: true, force: true })
            )
    )
})

describe("existing project setup", () => {
    test("preserves app source and existing dependency versions, then becomes idempotent", async () => {
        const root = await fixture({
            react: "19.3.0",
            vite: "8.3.1",
            "@passui/react": "0.1.1",
        })
        await writeFile(
            join(root, "app.tsx"),
            "application source"
        )
        const plan = await planProject(options(root))
        await writePlan(plan)
        const manifest = JSON.parse(
            await readFile(join(root, "package.json"), "utf8")
        )
        expect(manifest.scripts.dev).toBe("custom")
        expect(manifest.dependencies.react).toBe("19.3.0")
        expect(manifest.dependencies["@passui/react"]).toBe(
            "0.1.1"
        )
        expect(
            manifest.dependencies["@passui/tanstack"]
        ).toBeUndefined()
        expect(
            manifest.devDependencies["@tailwindcss/vite"]
        ).toBeDefined()
        expect(
            await readFile(join(root, "app.tsx"), "utf8")
        ).toBe("application source")
        expect(
            (await planProject(options(root))).files
        ).toEqual({})
    })
    test("rejects conflicts before changing the manifest", async () => {
        const root = await fixture()
        await mkdir(join(root, "passui"))
        await writeFile(
            join(root, "passui/providers.tsx"),
            "user content"
        )
        const before = await readFile(
            join(root, "package.json"),
            "utf8"
        )
        await expect(
            planProject(options(root))
        ).rejects.toThrow("Existing file differs")
        expect(
            await readFile(join(root, "package.json"), "utf8")
        ).toBe(before)
        expect(await readdir(join(root, "passui"))).toEqual([
            "providers.tsx",
        ])
    })
    test("rejects symlink destinations without writing through them", async () => {
        const root = await fixture()
        const other = await fixture()
        await symlink(other, join(root, "passui"), "dir")
        await expect(
            planProject(options(root))
        ).rejects.toThrow("Refusing symlink")
        expect(await readdir(other)).toEqual(["package.json"])
    })
    test.each<Record<string, string>>([
        { react: "^18.3.0" },
        { react: "^19.3.0", tailwindcss: "^3.4.0" },
    ])(
        "requires explicit upgrades for incompatible dependencies: %j",
        async (deps) => {
            const root = await fixture(deps)
            await expect(
                planProject(options(root))
            ).rejects.toThrow("upgrade explicitly")
        }
    )
    test("detects Next and adds optional integration without a Vite dependency", async () => {
        const root = await fixture({
            react: "^19.3.0",
            next: "^16.0.0",
        })
        const plan = await planProject(
            options(root, { integration: true })
        )
        const manifest = JSON.parse(
            plan.files["package.json"]
        )
        expect(plan.framework).toBe("next")
        expect(plan.files["passui/styles.css"]).toContain(
            "@passui/tanstack/styles.css"
        )
        expect(
            plan.files["passui/providers.tsx"]?.startsWith(
                '"use client"'
            )
        ).toBe(true)
        expect(plan.files["passui/README.md"]).toContain(
            "transpilePackages"
        )
        expect(
            manifest.devDependencies["@tailwindcss/postcss"]
        ).toBeDefined()
        expect(manifest.devDependencies.vite).toBeUndefined()
    })
    test("planning is read only and finds lockfiles", async () => {
        const root = await fixture()
        await writeFile(join(root, "pnpm-lock.yaml"), "")
        const plan = await planProject(
            options(root, { dryRun: true })
        )
        expect(plan.manager).toBe("pnpm")
        expect((await readdir(root)).sort()).toEqual([
            "package.json",
            "pnpm-lock.yaml",
        ])
        expect(
            await detectManager(root, {
                packageManager: "npm@12.2.0",
            })
        ).toBe("npm")
    })
})

describe("new project starters", () => {
    test.each(["vite", "tanstack"] as const)(
        "writes a complete %s starter and refuses nonempty targets",
        async (template) => {
            const parent = await fixture()
            const root = join(parent, "new-app")
            const plan = await planProject(
                options(root, { command: "create", template })
            )
            await writePlan(plan)
            expect(
                await readFile(
                    join(root, "passui/styles.css"),
                    "utf8"
                )
            ).toContain(
                template === "tanstack"
                    ? "@passui/tanstack/styles.css"
                    : "@passui/react/styles.css"
            )
            const entry = await readFile(
                join(
                    root,
                    template === "tanstack"
                        ? "src/routes/__root.tsx"
                        : "src/main.tsx"
                ),
                "utf8"
            )
            expect(entry).toContain("PassuiProvider")
            if (template === "tanstack")
                expect(entry).toContain("after={<Scripts />}")
            await expect(
                planProject(
                    options(root, {
                        command: "create",
                        template,
                    })
                )
            ).rejects.toThrow("empty directory")
        }
    )
})

test("refuses a stale plan before writing any generated files", async () => {
    const root = await fixture()
    const plan = await planProject(options(root))
    await writeFile(
        join(root, "package.json"),
        '{"dependencies":{"react":"^19.3.0"},"changed":true}'
    )
    await expect(writePlan(plan)).rejects.toThrow(
        "Project changed after planning"
    )
    expect((await readdir(root)).sort()).toEqual([
        "package.json",
    ])
})
