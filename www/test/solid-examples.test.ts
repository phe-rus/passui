import { expect, test } from "vitest"
import { getSolidExampleSource } from "@/domains/framework/get-solid-example-source"
import { getCatalog } from "@/domains/catalog/get-catalog"
import { hasSolidComponent } from "@passui/solid/docs"

test("Solid Ambient examples show image-driven glow instead of empty surfaces", () => {
    for (const id of ["usage", "images", "now-playing"]) {
        const source = getSolidExampleSource("ambient", id)
        expect(source).toContain("<Ambient")
        expect(source).toContain("src=")
        expect(source).toContain("@passui/solid/ambient")
        expect(source).not.toContain("@jsxImportSource")
    }
})

test("Solid documentation only presents existing native example sources", () => {
    expect(
        getSolidExampleSource("button", "pending")
    ).toContain("@passui/solid/button")
    expect(
        getSolidExampleSource("ambient", "nonexistent")
    ).toBe("")
})

test("Solid variants are native examples rather than React snippets", () => {
    for (const [slug, variants] of [
        ["chip", ["tones", "in-rows"]],
        ["status-indicator", ["states", "live"]],
        ["labeled-content", ["descriptions", "wide"]],
    ] as const) {
        for (const id of variants) {
            const source = getSolidExampleSource(slug, id)
            expect(source).toContain(`@passui/solid/${slug}`)
            expect(source).not.toContain("@jsxImportSource")
        }
    }
})

test("every React catalog scenario has a copyable native Solid example", () => {
    const missing: string[] = []
    for (const entry of getCatalog()) {
        if (!hasSolidComponent(entry.docs.slug)) continue
        const ids = [
            "usage",
            ...Object.keys(entry.content.examples),
        ]
        for (const id of ids) {
            const source = getSolidExampleSource(
                entry.docs.slug,
                id
            )
            if (!source)
                missing.push(`${entry.docs.slug}/${id}`)
            else if (source.includes("@jsxImportSource")) {
                missing.push(
                    `${entry.docs.slug}/${id} has a JSX directive`
                )
            }
        }
    }
    expect(missing).toEqual([])
})
