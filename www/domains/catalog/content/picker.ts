import type { pickerDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const pickerContent: ComponentContent<
    typeof pickerDocs
> = {
    summary:
        "A pop-up button that shows the current choice and opens a menu of options, never a native select.",
    usage: "Use it to choose one option from a list that is too long for a segmented control.",
    propDescriptions: {
        label: "Names the choice for screen readers and the menu.",
        searchable:
            "Adds a search field to the menu, for long lists.",
    },
    examples: {
        searchable: {
            title: "Searchable",
            description:
                "A search field at the top of the menu narrows long lists, with a detail on each row.",
        },
        details: {
            title: "With details",
            description:
                "A quieter detail on each option, such as a region or a price.",
        },
    },
    anatomy: [
        {
            element: "Button",
            description:
                "Shows the chosen option and opens the menu.",
            required: true,
        },
        {
            element: "Menu",
            description:
                "A floating list that keeps to the screen edges.",
            required: true,
        },
        {
            element: "Search",
            description:
                "An optional field that filters the options.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Turn on search once a list has more than about ten options.",
        },
        {
            kind: "do",
            text: "Use detail to add context, like a time zone's offset.",
        },
        {
            kind: "dont",
            text: "Use it for two or three options people compare; a segmented control shows them all.",
        },
    ],
    accessibility: [
        "Opens with Enter, Space or the arrow keys, and closes with Escape.",
        "The chosen option is marked for screen readers.",
    ],
}
