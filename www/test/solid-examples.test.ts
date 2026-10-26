import { expect, test } from "vitest"
import { getSolidExampleSource } from "@/domains/framework/get-solid-example-source"
import { getCatalog } from "@/domains/catalog/get-catalog"
import { hasSolidComponent } from "@passui/solid/docs"
import {
    getSolidComponentMarkdown,
    getSolidLlmsTxt,
    getSolidSkillMarkdown,
} from "@/domains/ai-context/get-ai-context"
import { getEntry } from "@/domains/catalog/get-catalog"

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

test("Solid AI documentation uses native examples and links", () => {
    const entry = getEntry("button")
    expect(entry).toBeDefined()
    const markdown = getSolidComponentMarkdown(
        entry!,
        "https://passui.pherus.org"
    )
    expect(markdown).toContain("@passui/solid/button")
    expect(markdown).toContain("/solid/components/button")
    expect(markdown).not.toContain("@passui/react/button")
    expect(markdown).not.toContain("@jsxImportSource")

    const skill = getSolidSkillMarkdown(
        "https://passui.pherus.org"
    )
    expect(skill).toContain("createSignal")
    expect(skill).toContain(
        "bunx @passui/cli init --framework solid"
    )
    expect(skill).toContain("@passui/tanstack/solid/")
    expect(
        getSolidLlmsTxt("https://passui.pherus.org")
    ).toContain("/solid/components/button")
})

test("key Solid scenarios teach the same use cases as React", () => {
    for (const [slug, id, phrases] of [
        [
            "button",
            "with-icon",
            ["Email", "Download", "Delete"],
        ],
        ["button", "link", ["Read the guide"]],
        [
            "dialog",
            "form",
            ["Rename project", "Pass console"],
        ],
        [
            "section",
            "actions",
            ["Export my data", "Clear cache"],
        ],
        [
            "stat-tile",
            "filters",
            ["All requests", "Open", "Waiting on you"],
        ],
        [
            "tooltip",
            "shortcuts",
            ["Bold", "Italic", "Underline"],
        ],
    ] as const) {
        const source = getSolidExampleSource(slug, id)
        for (const phrase of phrases)
            expect(source).toContain(phrase)
    }
})
