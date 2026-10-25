import type { contentViewDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const contentViewContent: ComponentContent<
    typeof contentViewDocs
> = {
    summary:
        "A raised card with parts for its heading, rows, dividers and large figures.",
    usage: "Use it for a tappable summary that leads somewhere, such as a security setting or a stat. Put a link inside that covers the card.",
    propDescriptions: {
        variant:
            "The card style. Elevated is raised with a shadow that deepens on hover.",
        heading:
            "The heading prop of ContentView.Header: the card's title.",
        description:
            "The p prop of ContentView.Header: one line under the title.",
    },
    examples: {
        stats: {
            title: "Figures",
            description:
                "Two numbers side by side with Row, Divider, H1, H2, Span and Sub.",
        },
        "header-action": {
            title: "Header with an icon and action",
            description:
                "Header's icon and action props put a symbol before the title and a control after it.",
        },
    },
    anatomy: [
        {
            element: "ContentView",
            description: "The card itself.",
            required: true,
        },
        {
            element: "ContentView.Header",
            description:
                "A heading with an optional icon, line of text and action.",
        },
        {
            element: "ContentView.Section and Row",
            description:
                "Stack parts on top of each other, or side by side.",
        },
        {
            element: "ContentView.Divider",
            description:
                "A thin vertical line between parts of a Row.",
        },
        {
            element: "H1, H2, P, Span and Sub",
            description: "Text parts for figures and labels.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Make the whole card a link when it shows a pointer and lifts on hover.",
        },
        {
            kind: "do",
            text: "Keep to one idea per card: a title, a line, and maybe a figure.",
        },
        {
            kind: "dont",
            text: "Put several buttons in a clickable card. Their clicks compete with the card's.",
        },
    ],
    accessibility: [
        "A card is a section. Give its link text that says where it goes, even if that text is only for screen readers.",
        "Header's as prop sets the heading level (h1, h2 or h3, h3 by default). Match it to the page's outline.",
    ],
}
