import type { searchFieldDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const searchFieldContent: ComponentContent<
    typeof searchFieldDocs
> = {
    summary:
        "A compact search input with a magnifying glass, for filtering lists as people type.",
    usage: "Use it above a list or in a toolbar. Filter results as people type rather than waiting for Enter.",
    propDescriptions: {
        placeholder:
            "What can be searched, like Search people.",
        disabled: "Shows the field but blocks typing.",
    },
    examples: {
        filter: {
            title: "Filtering a list",
            description:
                "The field narrows the rows below as people type, with a message when nothing matches.",
        },
        toolbar: {
            title: "In a toolbar",
            description:
                "A narrow field beside other controls at the top of a list.",
        },
    },
    anatomy: [
        {
            element: "Icon",
            description:
                "The magnifying glass that marks it as search.",
        },
        {
            element: "Input",
            description:
                "A search input that browsers can clear.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Say what is searched in the placeholder.",
        },
        {
            kind: "do",
            text: "Show a friendly message when nothing matches.",
        },
        {
            kind: "dont",
            text: "Hide search behind an icon when it is the main way to find things.",
        },
    ],
    accessibility: [
        "Give it an aria-label, since it has no visible label.",
        "It is a search input, so assistive technology announces it as search.",
    ],
}
