import type { tabViewDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const tabViewContent: ComponentContent<
    typeof tabViewDocs
> = {
    summary:
        "A row of tabs that switches between panels of content on the same screen.",
    usage: "Use it to split one screen into a few views of the same thing, such as a project's overview, activity and settings.",
    propDescriptions: {
        label: "Names the tab row for screen readers, such as Project or Account.",
        defaultValue:
            "The tab shown first. TabView remembers the choice itself after that.",
    },
    examples: {
        keyboard: {
            title: "Keyboard",
            description:
                "Tab moves into the row once. The arrow keys, Home and End then move between tabs and show each panel at once.",
        },
        settings: {
            title: "Settings in tabs",
            description:
                "Each tab holds its own rows, so a long settings screen splits into short views.",
        },
    },
    anatomy: [
        {
            element: "Tab row",
            description:
                "The tablist, centered, with a line under the current tab.",
            required: true,
        },
        {
            element: "Tab",
            description: "One option, from options.",
            required: true,
        },
        {
            element: "Panel",
            description:
                "What children returns for the current tab. Only that panel is rendered.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep to two to five short tab names that fit on a phone.",
        },
        {
            kind: "do",
            text: "Use tabs for views of the same thing, side by side in importance.",
        },
        {
            kind: "dont",
            text: "Use it for an app's main places. That's what TabBar and the sidebar are for.",
        },
    ],
    accessibility: [
        "Follows the WAI-ARIA tabs pattern: tablist, tab and tabpanel, each tab linked to its panel.",
        "Only the current tab is in the Tab order. Arrow keys move between tabs, and are swapped in right-to-left languages.",
    ],
}
