import { readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, test } from "vitest"

const pkg = JSON.parse(readFileSync(join(import.meta.dirname, "../../package.json"), "utf8"))

test("Solid exports prefer server builds in workerd and node", () => {
    let checked = 0
    for (const [key, entry] of Object.entries(pkg.exports) as [string, Record<string, string> | string][]) {
        if (!key.startsWith("./solid/") || typeof entry === "string") continue
        expect(entry.workerd).toBe(entry.node)
        expect(entry.workerd).toContain("/dist/server/")
        expect(entry.browser).toContain("/dist/client/")
        expect(Object.keys(entry)).toEqual(["types", "workerd", "node", "browser", "default"])
        checked++
    }
    expect(checked).toBe(8)
})
