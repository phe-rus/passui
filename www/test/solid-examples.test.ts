import { expect, test } from "vitest"
import { getSolidExampleSource } from "@/domains/framework/get-solid-example-source"

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
