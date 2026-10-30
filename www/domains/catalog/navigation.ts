import type { CatalogEntry } from "./types"

/** Human names for concepts whose public API is a hook or an installation host. */
export function componentTitle(
    entry: Pick<CatalogEntry, "docs">
): string {
    switch (entry.docs.slug) {
        case "context-menu":
            return "Context menu"
        case "tooltip":
            return "Tooltip"
        case "sidebar":
            return "Sidebar"
        case "toast":
            return "Toast"
        default:
            return entry.docs.name
    }
}

/** Search names, API names, and purpose without requiring exact capitalization. */
export function matchesComponent(
    entry: CatalogEntry,
    query: string
): boolean {
    const words = query.trim().toLowerCase().split(/\s+/)
    const text =
        `${componentTitle(entry)} ${entry.docs.name} ${entry.docs.slug} ${entry.group} ${entry.content.summary}`.toLowerCase()
    return words.every((word) => text.includes(word))
}
