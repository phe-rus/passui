import { describe, expect, test } from "vitest"
import { existsSync, globSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { registry } from "../../src/docs/registry"

const root = join(import.meta.dirname, "../..")
const components = join(root, "src/components")
const exportsMap: Record<string, string> = JSON.parse(
    readFileSync(join(root, "package.json"), "utf8")
).exports

/** button-sizes → ButtonSizes, the name an example file must export. */
const pascal = (name: string) =>
    name.replace(/(^|-)(\w)/g, (_, __, letter: string) =>
        letter.toUpperCase()
    )

/** Every docs file lives next to its examples; find a slug's folder. */
function examplePath(slug: string, id: string) {
    const file = `${slug}-${id}.tsx`
    for (const folder of globSync(`*/examples/${file}`, {
        cwd: components,
    }))
        return join(components, folder)
    return null
}

describe("docs registry", () => {
    test("every slug is unique", () => {
        const slugs = registry.map((docs) => docs.slug)
        expect(new Set(slugs).size).toBe(slugs.length)
    })

    test("every importPath is a package export", () => {
        for (const docs of registry) {
            const entry = docs.importPath.replace(
                /^@passui\/react/,
                "."
            )
            expect(
                exportsMap[entry],
                `${docs.slug}: ${docs.importPath}`
            ).toBeDefined()
        }
    })

    test("every select default is one of its options", () => {
        for (const docs of registry) {
            for (const [name, control] of Object.entries(
                docs.controls
            )) {
                if (control?.kind !== "select") continue
                expect(
                    control.default in control.options,
                    `${docs.slug}.${name}`
                ).toBe(true)
            }
        }
    })

    test("every control default matches its kind", () => {
        for (const docs of registry) {
            for (const [name, control] of Object.entries(
                docs.controls
            )) {
                if (!control) continue
                const expected =
                    control.kind === "boolean"
                        ? "boolean"
                        : "string"
                expect(
                    typeof control.default,
                    `${docs.slug}.${name}`
                ).toBe(expected)
            }
        }
    })

    test("example ids are unique within each page", () => {
        for (const docs of registry) {
            const ids = docs.examples.map(
                (example) => example.id
            )
            expect(new Set(ids).size, docs.slug).toBe(
                ids.length
            )
        }
    })

    test("example playground values are known controls", () => {
        for (const docs of registry) {
            for (const example of docs.examples) {
                for (const key of Object.keys(
                    example.playground ?? {}
                ))
                    expect(
                        key in docs.controls,
                        `${docs.slug}/${example.id}: ${key}`
                    ).toBe(true)
            }
        }
    })

    test("usage, showcase and every example have their file, exporting one function by its name", () => {
        for (const docs of registry) {
            const ids = [
                "usage",
                "showcase",
                ...docs.examples.map((example) => example.id),
            ]
            for (const id of ids) {
                const path = examplePath(docs.slug, id)
                expect(
                    path,
                    `${docs.slug}-${id}.tsx`
                ).not.toBeNull()
                const source = readFileSync(
                    path as string,
                    "utf8"
                )
                const exported = [
                    ...source.matchAll(
                        /^export (\w+) (\w+)/gm
                    ),
                ]
                expect(
                    exported.map(
                        ([, kind, name]) => `${kind} ${name}`
                    ),
                    `${docs.slug}-${id}.tsx`
                ).toEqual([
                    `function ${pascal(`${docs.slug}-${id}`)}`,
                ])
            }
        }
    })

    test("overlay frames ask for a sensible height", () => {
        for (const docs of registry) {
            if (docs.previewHeight === undefined) continue
            expect(
                docs.previewHeight,
                docs.slug
            ).toBeGreaterThan(160)
            expect(
                docs.previewHeight,
                docs.slug
            ).toBeLessThanOrEqual(720)
        }
    })

    test("the docs module stays inside the package", () => {
        expect(
            existsSync(join(root, "src/docs/index.ts"))
        ).toBe(true)
        expect(exportsMap["./docs"]).toBe(
            "./src/docs/index.ts"
        )
    })
})
