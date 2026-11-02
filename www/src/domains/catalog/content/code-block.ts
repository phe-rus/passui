import type { codeBlockDocs } from "../definitions"
import type { ComponentContent } from "../types"
export const codeBlockContent: ComponentContent<typeof codeBlockDocs> = {
    summary: "Code with selectable source and optional line numbers.",
    usage: "Code with selectable source and optional line numbers.",
    propDescriptions: {
        code: "Displayed source text.",
        lineNumbers: "Controls whether the line gutter is visible.",
    },
    examples: {
        plain: {
            title: "Plain source",
            description: "Keep short snippets simple.",
        },
        multiline: {
            title: "Multiple lines",
            description: "The gutter follows every source line, including empty lines.",
        },
    },
    anatomy: [
        {
            element: "Content",
            description: "Code surface with source text and a decorative line gutter.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Use concise, localized labels that describe the current context.",
        },
    ],
    accessibility: ["Source content and text remain available to assistive technologies."],
}
