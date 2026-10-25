import type { secureFieldDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const secureFieldContent: ComponentContent<
    typeof secureFieldDocs
> = {
    summary:
        "A password field with an optional Show and Hide button.",
    usage: "Use it for passwords and other secrets. Give it revealLabels so people can check what they typed.",
    propDescriptions: {
        label: "The visible name of the field.",
        placeholder:
            "A hint about the rules, like the minimum length.",
        disabled: "Shows the field but blocks typing.",
    },
    examples: {
        reveal: {
            title: "Show and hide",
            description:
                "revealLabels adds a button that shows the password while typing, then hides it again.",
        },
        "new-password": {
            title: "Choosing a new password",
            description:
                "A hint while typing, then an error until the two fields match.",
        },
    },
    anatomy: [
        {
            element: "Label",
            description: "Names the field.",
            required: true,
        },
        {
            element: "Input",
            description: "Hides what is typed by default.",
            required: true,
        },
        {
            element: "Reveal button",
            description:
                "Shows or hides the text, when revealLabels is set.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Set autoComplete to current-password or new-password so password managers help.",
        },
        {
            kind: "do",
            text: "Say the rules before people type, not only after an error.",
        },
        {
            kind: "dont",
            text: "Block pasting into the field.",
        },
    ],
    accessibility: [
        "The reveal button is a real button with a clear label.",
        "Errors are announced with the field, like TextField.",
    ],
}
