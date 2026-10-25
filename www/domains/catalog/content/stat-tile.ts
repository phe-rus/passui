import type { statTileDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const statTileContent: ComponentContent<
    typeof statTileDocs
> = {
    summary:
        "A number with a label and a quiet caption, for dashboards and summaries.",
    usage: "Use tiles in a grid to show the numbers people check most. Give them onClick to act as filters.",
    propDescriptions: {
        label: "What the number counts.",
        caption:
            "A quiet line under the number, like 3 signed in now.",
        critical:
            "Turns the number red once it is above zero, for things that need attention.",
        active: "Marks the tile as the chosen filter.",
    },
    examples: {
        grid: {
            title: "A row of figures",
            description:
                "Tiles in a grid for a dashboard, one critical when its number needs attention.",
        },
        filters: {
            title: "Tiles as filters",
            description:
                "With onClick, a tile becomes a toggle: active marks the filter in use.",
        },
    },
    anatomy: [
        {
            element: "Label",
            description: "What is counted.",
            required: true,
        },
        {
            element: "Value",
            description: "The number, in tabular figures.",
            required: true,
        },
        {
            element: "Caption",
            description: "Optional context under the number.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep labels short and the same length across a row.",
        },
        {
            kind: "do",
            text: "Use critical only for counts that should be zero.",
        },
        {
            kind: "dont",
            text: "Show more than about six tiles at once.",
        },
    ],
    accessibility: [
        "With onClick it becomes a button and reports when it is active.",
        "Numbers use tabular figures so they line up as they change.",
    ],
}
