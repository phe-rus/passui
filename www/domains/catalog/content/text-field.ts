import type { textFieldDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const textFieldContent: ComponentContent<
    typeof textFieldDocs
> = {
    summary:
        "A labelled single line input with room for a hint and error messages.",
    usage: "Use it for short text people type: names, emails, links. The label is always visible.",
    propDescriptions: {
        label: "The visible name of the field, linked to the input.",
        placeholder:
            "An example of what to type. Never a replacement for the label.",
        disabled: "Shows the field but blocks typing.",
        icon: "A decorative icon before the text, such as an envelope for email. Hidden from screen readers.",
        trailingIcon:
            "A decorative icon after the text, such as a check once the value is valid. Hidden from screen readers.",
    },
    examples: {
        icons: {
            title: "Icons",
            description:
                "An icon on either side: one before the text to show what it is for, one after it for status.",
        },
        validation: {
            title: "Validation",
            description:
                "A hint under the field, and an error once the value is wrong.",
        },
    },
    anatomy: [
        {
            element: "Label",
            description: "Names the field above it.",
            required: true,
        },
        {
            element: "Input",
            description: "Where people type.",
            required: true,
        },
        {
            element: "Icons",
            description:
                "Optional decorative icons before and after the text.",
        },
        {
            element: "Hint",
            description:
                "An optional line that helps people get it right.",
        },
        {
            element: "Errors",
            description:
                "Messages shown when the value needs fixing.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep labels short and specific: Work email, not Email address field.",
        },
        {
            kind: "do",
            text: "Explain how to fix an error, not just that something is wrong.",
        },
        {
            kind: "dont",
            text: "Use the placeholder as the label; it disappears as people type.",
        },
    ],
    accessibility: [
        "The label is linked to the input, so it is read when the field is focused.",
        "Errors set aria-invalid and are announced with the field.",
        "Icons are hidden from screen readers, so never put meaning only in an icon. Say it in the label or the hint too.",
    ],
}
