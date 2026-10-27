import { expect, test } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = join(import.meta.dirname, "../..")
const pkg = JSON.parse(
    readFileSync(join(root, "package.json"), "utf8")
)

test("exports map includes expected entries", () => {
    for (const [entry, filename] of [
        [".", "index"],
        ["./appearance", "appearance/index"],
        ["./cn", "lib/class-names"],
        ["./tokens", "tokens/index"],
    ]) {
        expect(pkg.exports[entry]).toEqual({
            types: `./dist/types/src/${filename}.d.ts`,
            workerd: `./dist/server/src/${filename}.js`,
            node: `./dist/server/src/${filename}.js`,
            browser: `./dist/client/src/${filename}.js`,
            default: `./dist/client/src/${filename}.js`,
        })
    }
    expect(pkg.exports["./styles.css"]).toBe(
        "./src/styles/styles.css"
    )
})

test("Worker SSR and browser exports resolve to the correct builds", () => {
    const choose = (entry: Record<string, string>, conditions: string[]) =>
        Object.entries(entry).find(([condition]) =>
            condition === "default" || conditions.includes(condition)
        )?.[1]

    for (const entry of Object.values(pkg.exports)) {
        if (typeof entry === "string") continue

        expect(choose(entry, ["workerd", "browser"])).toContain("/dist/server/")
        expect(choose(entry, ["node", "browser"])).toContain("/dist/server/")
        expect(choose(entry, ["browser"])).toContain("/dist/client/")
        expect(choose(entry, [])).toContain("/dist/client/")
    }
})

test("no react in dependencies or peerDependencies", () => {
    expect(pkg.dependencies?.react).toBeUndefined()
    expect(pkg.peerDependencies?.react).toBeUndefined()
    expect(pkg.devDependencies?.react).toBeUndefined()
})
