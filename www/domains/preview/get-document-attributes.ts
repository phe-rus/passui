import type { PreviewSettings } from "@/domains/settings"

export type DocumentAttributes = {
    "data-theme"?: "light" | "dark"
    "data-accent"?: string
    "data-os"?: string
}

/**
 * The preview's settings as `<html>` attributes. System theme, Blush and
 * an automatic platform are the root's own defaults, so they add nothing.
 */
export function getDocumentAttributes(settings: PreviewSettings): DocumentAttributes {
    return {
        ...(settings.theme !== "system" && {
            "data-theme": settings.theme,
        }),
        ...(settings.accent !== "blush" && {
            "data-accent": settings.accent,
        }),
        ...(settings.os !== "auto" && {
            "data-os": settings.os,
        }),
    }
}

const managed = ["data-theme", "data-accent", "data-os"] as const

/**
 * Applies new settings to a live document, removing what no longer
 * applies. `data-os` changes only when the platform does: on "auto" the
 * platform provider writes the detected one, which must survive later
 * messages (contract item 11).
 */
export function applyDocumentAttributes(
    root: HTMLElement,
    settings: PreviewSettings,
    previous: PreviewSettings
) {
    const next = getDocumentAttributes(settings)
    for (const name of managed) {
        if (name === "data-os" && settings.os === previous.os) continue
        const value = next[name]
        if (value) root.setAttribute(name, value)
        else root.removeAttribute(name)
    }
}
