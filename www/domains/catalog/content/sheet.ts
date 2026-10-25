import type { sheetDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const sheetContent: ComponentContent<
    typeof sheetDocs
> = {
    summary:
        "A modal card that rises from the bottom on phones and floats in the middle on larger screens, holding whatever you put in it.",
    usage: "Use it for a self-contained task over the page, such as sharing or choosing a color. Dialog is a Sheet with a title, description and actions already laid out.",
    propDescriptions: {
        label: "Names the sheet for screen readers. Use labelledBy instead to point at a visible heading.",
    },
    examples: {
        share: {
            title: "Share sheet",
            description:
                "A setting and two actions. Copy link closes the sheet and confirms with a toast.",
        },
        choices: {
            title: "Choosing from a list",
            description:
                "A list of choices in a sheet, closing as soon as one is picked.",
        },
    },
    anatomy: [
        {
            element: "Backdrop",
            description:
                "Dims and blurs the page. A tap on it closes the sheet.",
            required: true,
        },
        {
            element: "Card",
            description:
                "Glass with large rounded corners: flush with the bottom on phones, floating on larger screens.",
            required: true,
        },
        {
            element: "Content",
            description:
                "Your own layout, with its own padding.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Give every sheet a clear way out, such as Done or Cancel, as well as Escape and the backdrop.",
        },
        {
            kind: "do",
            text: "Keep it to one task. If it needs steps, put them on a page instead.",
        },
        {
            kind: "dont",
            text: "Put long pages in a sheet. It's capped at 92% of the screen's height.",
        },
    ],
    accessibility: [
        "A modal dialog: focus moves in, stays in while it's open, and returns when it closes.",
        "The rest of the page is hidden from screen readers while the sheet is open.",
    ],
}
