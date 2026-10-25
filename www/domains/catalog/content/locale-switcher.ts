import type { localeSwitcherDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const localeSwitcherContent: ComponentContent<
    typeof localeSwitcherDocs
> = {
    summary:
        "A small floating language button that opens into a list of languages, each in its own name, and can be dragged to any corner.",
    usage: "Use it on public pages where people may arrive in the wrong language. It remembers the corner it was dragged to under storageKey.",
    propDescriptions: {
        label: "Names the button for screen readers, such as Change language.",
        locales:
            "The locales prop: the language codes offered, each shown in its own language.",
    },
    examples: {
        "native-names": {
            title: "Each language in its own name",
            description:
                "Open it to see the list: every language written the way its speakers write it.",
        },
        "translated-page": {
            title: "Switching a page's language",
            description:
                "The page's words and its lang attribute follow the chosen language.",
        },
    },
    anatomy: [
        {
            element: "Button",
            description:
                "Shows the current language's code. Drag it to move it.",
            required: true,
        },
        {
            element: "List",
            description:
                "Every language in its own name, with the current one marked.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Give each app its own storageKey, so positions don't clash.",
        },
        {
            kind: "do",
            text: "Show each language in its own name: Français, not French.",
        },
        {
            kind: "dont",
            text: "Use it inside settings. A Picker fits better there.",
        },
    ],
    accessibility: [
        "The button is labelled by label and reports whether the list is open.",
        "Moving the pointer away or clicking outside closes the list.",
    ],
}
