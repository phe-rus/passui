import { spawnSync } from "node:child_process"

for (const [cwd, file] of [[".", "scripts/generate-react-api.mjs"], ["www", "scripts/generate-navigation.ts"]]) {
    const result = spawnSync("bun", [file, ...process.argv.slice(2)], { cwd, stdio: "inherit" })
    if (result.error) throw result.error
    if (result.status !== 0) process.exit(result.status ?? 1)
}
