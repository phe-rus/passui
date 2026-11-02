import type { AccentId } from "@passui/react/tokens"

export type ChangelogEntry = {
    /** ISO date the change landed on `main`. */
    date: string
    title: string
    summary: string
}

export type AccentCycle = {
    accent: AccentId
    /** Picks an accent and stops the automatic cycle. */
    select: (accent: AccentId) => void
    /** Keyboard focus inside the hero holds the current accent. */
    hold: (held: boolean) => void
}

export type ShowcaseScheme = "light" | "dark"

export type ShowcaseTheme = {
    accent: AccentId
    scheme: ShowcaseScheme
}

export type ShowcaseCardBodyProps = {
    theme: ShowcaseTheme
}
