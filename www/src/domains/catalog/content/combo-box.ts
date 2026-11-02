import type { comboBoxDocs } from "../definitions"
import type { ComponentContent } from "../types"
export const comboBoxContent: ComponentContent<typeof comboBoxDocs> = {
    summary: "Choose from an editable, keyboard navigable list.",
    usage: "Choose from an editable, keyboard navigable list.",
    propDescriptions: {
        label: "Localized label describing the control or loading state.",
    },
    examples: {
        languages: {
            title: "A short list",
            description: "Choose from an editable, keyboard navigable list.",
        },
        disabled: {
            title: "Unavailable selection",
            description: "Choose from an editable, keyboard navigable list.",
        },
    },
    anatomy: [
        {
            element: "Content",
            description: "Choose from an editable, keyboard navigable list.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Use concise, localized labels that describe the current context.",
        },
    ],
    accessibility: ["Labels and values remain available to assistive technologies."],
}
