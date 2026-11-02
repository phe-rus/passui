import type { dividerDocs } from "@/domains/catalog/definitions"
import type { ComponentContent } from "../types"

export const dividerContent: ComponentContent<typeof dividerDocs> = {
    summary: "A quiet line that separates related rows, groups, or adjacent actions.",
    usage: "Use a divider when spacing alone does not make the separation clear.",
    propDescriptions: {
        orientation: "Horizontal for stacked content, vertical for adjacent content.",
        decorative: "Hides visual-only separators from assistive technology.",
    },
    examples: {
        sections: {
            title: "Section break",
            description: "A semantic boundary between content groups.",
        },
        vertical: {
            title: "Inline groups",
            description: "Vertical separators between adjacent choices.",
        },
    },
    anatomy: [
        {
            element: "Separator line",
            description: "Uses the shared surface separator color.",
            required: true,
        },
    ],
    practices: [
        { kind: "do", text: "Use a semantic separator only when the boundary conveys meaning." },
        { kind: "dont", text: "Stack several decorative rules where spacing can group content." },
    ],
    accessibility: [
        "Decorative separators are hidden by default.",
        "Set decorative to false for semantic horizontal or vertical separation.",
    ],
}
