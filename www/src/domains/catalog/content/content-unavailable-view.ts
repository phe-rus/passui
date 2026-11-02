import type { contentUnavailableViewDocs } from "../definitions"
import type { ComponentContent } from "../types"
export const contentUnavailableViewContent: ComponentContent<typeof contentUnavailableViewDocs> = {
    summary: "A clear empty state with context and a useful next action.",
    usage: "A clear empty state with context and a useful next action.",
    propDescriptions: {
        title: "Text shown in the component.",
        description: "Text shown in the component.",
    },
    examples: {
        empty: {
            title: "An empty collection",
            description: "Explain what will appear when content is added.",
        },
        search: {
            title: "Search results",
            description: "Describe the search state without announcing a failure.",
        },
    },
    anatomy: [
        {
            element: "Content",
            description: "Title, optional description, decorative icon and recovery actions.",
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
