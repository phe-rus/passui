import type { AccentId } from "@passui/react/tokens"

type AccentNames = Record<AccentId, string>

// Site prose, not the token names: the site translates its own copy later.
export const accentNames: AccentNames = {
    blush: "Blush",
    honey: "Honey",
    sage: "Sage",
    ocean: "Ocean",
    lavender: "Lavender",
    rose: "Rose",
    graphite: "Graphite",
}
