import type { inlineDisclosureDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const inlineDisclosureContent: ComponentContent<
    typeof inlineDisclosureDocs
> = {
    summary:
        "A spring-driven inline reveal for account settings and small details.",
    usage: "Use it when a row expands into editable fields without covering the rest of the page.",
    propDescriptions: {
        open: "Whether the details are expanded.",
        children:
            "The details to reveal beneath the trigger.",
    },
    examples: {
        settings: {
            title: "Edit settings",
            description:
                "Open and close details beneath a settings row.",
        },
        details: {
            title: "Read details",
            description:
                "Reveal multiple lines without jumping the layout.",
        },
    },
    anatomy: [
        {
            element: "Trigger",
            description:
                "Owned by the app; updates the open state.",
            required: true,
        },
        {
            element: "Revealed content",
            description:
                "Moves surrounding content with a spring.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Use a visible trigger with aria-expanded.",
        },
        {
            kind: "do",
            text: "Keep the detail short and directly related to its row.",
        },
        {
            kind: "dont",
            text: "Use it for a task that needs a modal decision; choose Dialog instead.",
        },
    ],
    accessibility: [
        "The app's trigger communicates expanded state with aria-expanded.",
        "Height and opacity transitions are disabled for Reduce Motion.",
    ],
}
