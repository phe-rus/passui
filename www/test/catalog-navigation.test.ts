import { expect, test } from "vitest"
import { getCatalog } from "../domains/catalog/get-catalog"
import {
    componentTitle,
    matchesComponent,
} from "../domains/catalog/navigation"

test("search finds concepts by API name or purpose, regardless of case", () => {
    const menu = getCatalog().find(
        (entry) => entry.docs.slug === "context-menu"
    )!
    expect(componentTitle(menu)).toBe("Context menu")
    expect(matchesComponent(menu, "useContextMenu")).toBe(
        true
    )
    expect(matchesComponent(menu, "CONTEXT menu")).toBe(true)
    expect(matchesComponent(menu, "calendar")).toBe(false)
    expect(matchesComponent(menu, "   ")).toBe(true)
})

test("every entry belongs to exactly one discoverable family", () => {
    const entries = getCatalog()
    expect(
        new Set(entries.map((entry) => entry.docs.slug)).size
    ).toBe(entries.length)
    for (const entry of entries)
        expect(matchesComponent(entry, entry.group)).toBe(
            true
        )
    expect(
        entries.find(
            (entry) => entry.docs.slug === "locale-switcher"
        )?.group
    ).toBe("Controls")
    expect(
        entries.find((entry) => entry.docs.slug === "toast")
            ?.group
    ).toBe("Feedback")
})
