import { expect, test } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const root = join(import.meta.dirname, "../..")
const pkg = JSON.parse(
    readFileSync(join(root, "package.json"), "utf8")
)

test("exports map includes expected entries", () => {
    expect(pkg.exports["."]).toBe("./src/index.ts")
    expect(pkg.exports["./appearance"]).toBe(
        "./src/appearance/index.ts"
    )
    expect(pkg.exports["./cn"]).toBe(
        "./src/lib/class-names.ts"
    )
    expect(pkg.exports["./styles.css"]).toBe(
        "./src/styles/styles.css"
    )
    expect(pkg.exports["./tokens"]).toBe(
        "./src/tokens/index.ts"
    )
})

test("no react in dependencies or peerDependencies", () => {
    expect(pkg.dependencies?.react).toBeUndefined()
    expect(pkg.peerDependencies?.react).toBeUndefined()
    expect(pkg.devDependencies?.react).toBeUndefined()
})
