import { accents } from "@passui/react/tokens"
import type { CSSProperties } from "react"
import type { ShowcaseTheme } from "./types"

/**
 * Accent tokens as inline CSS variables, so one card can wear its own
 * accent while the page wears another (the tokens only switch accents on
 * the root).
 */
export function getThemeStyle(
    theme: ShowcaseTheme
): CSSProperties {
    const colors = accents[theme.accent][theme.scheme]
    return {
        "--color-accent": colors.accent,
        "--color-on-accent": colors.onAccent,
        "--color-accent-text": colors.accentText,
        "--color-accent-soft": colors.accentSoft,
    } as CSSProperties
}
