import { type AccentId, accents } from "@passui/react/tokens"
import { z } from "zod"

export const themeOptions = [
    "system",
    "light",
    "dark",
] as const
export const platformOptions = [
    "auto",
    "ios",
    "android",
    "macos",
    "windows",
    "linux",
] as const

export const viewportOptions = [
    "phone",
    "tablet",
    "fill",
] as const

export type PreviewTheme = (typeof themeOptions)[number]
export type PreviewViewport = (typeof viewportOptions)[number]
export type PreviewPlatform = (typeof platformOptions)[number]

const accentIds = Object.keys(accents) as [
    AccentId,
    ...AccentId[],
]

/**
 * Each key is optional in links and falls back to its default when a URL
 * carries a value the site does not know (contract item 7).
 */
export const previewSettingsSchema = z.object({
    theme: z
        .enum(themeOptions)
        .default("system")
        .catch("system"),
    accent: z.enum(accentIds).default("blush").catch("blush"),
    os: z.enum(platformOptions).default("auto").catch("auto"),
})

export type PreviewSettings = z.output<
    typeof previewSettingsSchema
>

export const settingsDefaults: PreviewSettings = {
    theme: "system",
    accent: "blush",
    os: "auto",
}

/** Control values as they travel in a URL; checked against docs later. */
export const rawPropsSchema = z
    .record(z.string(), z.unknown())
    .default({})
    .catch({})

/** What `/preview/$slug` reads from its URL. */
export const previewSearchSchema =
    previewSettingsSchema.extend({
        props: rawPropsSchema,
        /** The live component (playground) or its realistic showcase. */
        scene: z
            .enum(["component", "showcase"])
            .default("component")
            .catch("component"),
    })

/** What the docs pages read from their URL: the settings plus the frame size. */
export const docsSettingsSchema =
    previewSettingsSchema.extend({
        viewport: z
            .enum(viewportOptions)
            .default("fill")
            .catch("fill"),
    })

export type DocsSettings = z.output<typeof docsSettingsSchema>

export const docsSettingsDefaults: DocsSettings = {
    ...settingsDefaults,
    viewport: "fill",
}

/** The settings keys that follow you from page to page (AC-6). */
export const carriedSettings = [
    "theme",
    "accent",
    "os",
    "viewport",
] as const satisfies readonly (keyof DocsSettings)[]

/** What a component page reads from its URL, beyond the settings. */
export const componentSearchSchema = z.object({
    props: rawPropsSchema,
})
