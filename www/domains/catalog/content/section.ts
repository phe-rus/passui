import type { sectionDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const sectionContent: ComponentContent<
    typeof sectionDocs
> = {
    summary:
        "A titled, inset group of rows with a footer note, as in iOS Settings.",
    usage: "Use sections to group related settings or details, with LabeledContent rows inside.",
    propDescriptions: {
        title: "The small heading above the group. Groups can stand without one.",
        footer: "A quiet note under the group that explains its rows.",
    },
    examples: {
        groups: {
            title: "Grouped settings",
            description:
                "Several sections on one screen, each with a title and an optional footer, as in iOS Settings.",
        },
        actions: {
            title: "Rows that act",
            description:
                "Buttons as rows, with a destructive action in its own section at the end.",
        },
    },
    anatomy: [
        {
            element: "Title",
            description:
                "A small heading that names the group.",
        },
        {
            element: "Rows",
            description:
                "The inset card holding the rows, divided by thin lines.",
        },
        {
            element: "Footer",
            description:
                "An optional explanation under the card.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Group rows that belong together and name the group.",
        },
        {
            kind: "do",
            text: "Use the footer to explain consequences, not to repeat the title.",
        },
        {
            kind: "dont",
            text: "Put a single long form in one section; split it into meaningful groups.",
        },
    ],
    accessibility: [
        "Renders a section labelled by its title, so it can be found by landmarks.",
        "The title is a heading, so it shows in a screen reader's outline.",
    ],
}
