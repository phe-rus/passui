import type { chipDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const chipContent: ComponentContent<typeof chipDocs> =
    {
        summary:
            "A small label for status, sharing or categories, quiet enough to sit beside any text.",
        usage: "Use a chip to tag something with a short word, like who it is shared with or whether it is a draft.",
        propDescriptions: {
            tone: "The colour. Public, family and friends match Passui's sharing levels.",
            children: "The text. One or two words.",
        },
        examples: {
            tones: {
                title: "Tones",
                description:
                    "Neutral and accent for status; the sharing tones for who can see something.",
            },
            "in-rows": {
                title: "In list rows",
                description:
                    "Small tags beside a name, for roles and sharing.",
            },
        },
        anatomy: [
            {
                element: "Label",
                description:
                    "A word or two in small, bold text.",
                required: true,
            },
        ],
        practices: [
            {
                kind: "do",
                text: "Keep it to one or two words.",
            },
            {
                kind: "do",
                text: "Use the same tone for the same meaning across your app.",
            },
            {
                kind: "dont",
                text: "Make a chip clickable; use a button for actions.",
            },
        ],
        accessibility: [
            "It is plain text, so screen readers read it in place.",
            "Do not rely on colour alone; the word carries the meaning.",
        ],
    }
