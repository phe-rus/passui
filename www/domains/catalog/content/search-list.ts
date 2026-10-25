import type { searchListDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const searchListContent: ComponentContent<
    typeof searchListDocs
> = {
    summary:
        "A search field with a list of results that filters as you type and can be driven with the arrow keys.",
    usage: "Use it to jump to one item in a known set: settings, people, commands. Each item matches on its value and keywords.",
    propDescriptions: {
        open: "Shows or hides the results. Pair it with the field's focus to make a dropdown.",
        placeholder:
            "Set on SearchListField. Hints at what can be found, and becomes its label if no aria-label is given.",
        empty: "The children of SearchListEmpty, shown when nothing matches.",
    },
    examples: {
        groups: {
            title: "Groups and keywords",
            description:
                "Results in titled groups. Keywords let 2fa find Two-step verification, and empty groups hide themselves.",
        },
        dropdown: {
            title: "As a dropdown",
            description:
                "Results show only while the field has focus, floating under it like a search bar's suggestions.",
        },
    },
    anatomy: [
        {
            element: "SearchList",
            description:
                "Holds the query and handles the keyboard.",
            required: true,
        },
        {
            element: "SearchListField",
            description: "The input, a combobox.",
            required: true,
        },
        {
            element: "SearchListResults",
            description: "The listbox holding every result.",
            required: true,
        },
        {
            element: "SearchListItem",
            description:
                "One result, hidden when it doesn't match the query.",
            required: true,
        },
        {
            element: "SearchListGroup",
            description:
                "A titled set of results, hidden when none match.",
        },
        {
            element: "SearchListEmpty",
            description: "Shown only when no result matches.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Add keywords for the words people actually type, like 2fa or dark mode.",
        },
        {
            kind: "do",
            text: "Always include SearchListEmpty, so a search with no matches says so.",
        },
        {
            kind: "dont",
            text: "Use it for thousands of items or server results. It filters what is already rendered.",
        },
    ],
    accessibility: [
        "The field is a combobox linked to the results listbox, with aria-activedescendant following the arrow keys.",
        "Up and Down move through visible results and Enter picks one, while focus stays in the field.",
        "The empty message has role status, so a search with no results is announced.",
    ],
}
