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
