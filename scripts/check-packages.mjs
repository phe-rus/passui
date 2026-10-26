import { spawnSync } from "node:child_process"
import {
    mkdtempSync,
    readFileSync,
    readdirSync,
    rmSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const packages = ["tokens", "ui", "solid", "tanstack", "cli"]
const temporary = mkdtempSync(join(tmpdir(), "passui-pack-"))

function run(command, args, cwd) {
    const result = spawnSync(command, args, {
        cwd,
        encoding: "utf8",
    })
    if (result.error) throw result.error
    if (result.status !== 0)
        throw new Error(result.stderr || result.stdout)
    return result.stdout
}

try {
    for (const directory of packages) {
        const cwd = join(root, "packages", directory)
        const manifest = JSON.parse(
            readFileSync(join(cwd, "package.json"), "utf8")
        )
        run("bun", ["pm", "pack", "--destination", temporary], cwd)
        const archives = readdirSync(temporary).filter((name) =>
            name.endsWith(".tgz")
        )
        if (archives.length !== 1)
            throw new Error("Expected exactly one package archive")
        const archive = join(temporary, archives[0])
        const entries = new Set(
            run("tar", ["-tzf", archive], cwd).trim().split("\n")
        )
        const packed = JSON.parse(
            run("tar", ["-xOf", archive, "package/package.json"], cwd)
        )
        const exportTargets = Object.values(manifest.exports ?? {}).flatMap(
            (entry) => typeof entry === "string" ? [entry] : Object.values(entry)
        )
        for (const target of [
            ...exportTargets,
            ...Object.values(manifest.bin ?? {}),
        ]) {
            if (typeof target !== "string")
                throw new Error("Expected explicit export targets")
            if (!entries.has(`package/${target.replace(/^\.\//, "")}`))
                throw new Error(`${manifest.name}: missing ${target}`)
        }
        for (const group of ["dependencies", "peerDependencies"]) {
            for (const version of Object.values(packed[group] ?? {})) {
                if (version.startsWith("workspace:"))
                    throw new Error(`${manifest.name}: unresolved workspace dependency`)
            }
        }
        for (const entry of entries) {
            if (/(?:^|\/)(?:test|tests|node_modules|\.env[^/]*|\.npmrc)(?:\/|$)/.test(entry))
                throw new Error(`${manifest.name}: unexpected packed file ${entry}`)
        }
        console.log(`${manifest.name}: archive and export targets verified`)
        rmSync(archive)
    }
} finally {
    rmSync(temporary, { recursive: true, force: true })
}
