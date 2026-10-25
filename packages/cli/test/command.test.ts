import { afterEach, expect, test } from "vitest"
import { version } from "../package.json"
import {
    mkdtemp,
    readdir,
    rm,
    writeFile,
} from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { spawnSync } from "node:child_process"

const directories: string[] = []
// the published bin, built by the test script first
const entry = resolve(
    import.meta.dirname,
    "../dist/passui.js"
)
function run(args: string[]) {
    return spawnSync(process.execPath, [entry, ...args], {
        encoding: "utf8",
    })
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

test("help and errors have predictable exit status", () => {
    expect(run(["--help"]).status).toBe(0)
    expect(run(["--version"]).stdout.trim()).toBe(version)
    expect(run(["create"]).status).toBe(1)
    expect(run(["init", "--pm", "unknown"]).status).toBe(1)
    expect(run(["init", "--unknown"]).status).toBe(1)
})
test("dry run creates nothing and no-install works in a path with spaces", async () => {
    const root = await mkdtemp(join(tmpdir(), "passui cli "))
    directories.push(root)
    await writeFile(
        join(root, "package.json"),
        '{"dependencies":{"react":"^19.3.0"}}'
    )
    expect(
        run(["init", "--dir", root, "--dry-run"]).status
    ).toBe(0)
    expect(await readdir(root)).toEqual(["package.json"])
    const result = run([
        "init",
        "--dir",
        root,
        "--no-install",
    ])
    expect(result.status).toBe(0)
    expect(result.stdout).toContain("Follow passui/README.md")
    expect(await readdir(root)).toEqual([
        "package.json",
        "passui",
    ])
})

test("runs the chosen package manager without shell interpretation and reports install failure", async () => {
    const root = await mkdtemp(
        join(tmpdir(), "passui install ")
    )
    directories.push(root)
    const bin = join(root, "bin")
    const { mkdir, chmod, readFile } = await import(
        "node:fs/promises"
    )
    await mkdir(bin)
    const executable = join(bin, "npm")
    await writeFile(
        executable,
        `#!${process.execPath}\nimport { writeFileSync } from "node:fs"; writeFileSync("install-call.json", JSON.stringify(process.argv.slice(2))); process.exit(Number(process.env.PASSUI_TEST_EXIT || 0));\n`
    )
    await chmod(executable, 0o755)
    await writeFile(
        join(root, "package.json"),
        '{"dependencies":{"react":"^19.3.0"}}'
    )
    const result = spawnSync(
        process.execPath,
        [entry, "init", "--dir", root, "--pm", "npm"],
        {
            encoding: "utf8",
            env: {
                ...process.env,
                PATH: `${bin}:${process.env.PATH}`,
            },
        }
    )
    expect(result.status).toBe(0)
    expect(
        JSON.parse(
            await readFile(
                join(root, "install-call.json"),
                "utf8"
            )
        )
    ).toEqual(["install"])
    const failure = spawnSync(
        process.execPath,
        [entry, "init", "--dir", root, "--pm", "npm"],
        {
            encoding: "utf8",
            env: {
                ...process.env,
                PATH: `${bin}:${process.env.PATH}`,
                PASSUI_TEST_EXIT: "9",
            },
        }
    )
    expect(failure.status).toBe(1)
    expect(failure.stderr).toContain(
        "Files are ready; retry installation"
    )
    expect(
        await readFile(
            join(root, "passui/providers.tsx"),
            "utf8"
        )
    ).toContain("PassuiProvider")
})
