import type { swatchPickerDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const swatchPickerContent: ComponentContent<
    typeof swatchPickerDocs
> = {
    summary:
        "A row of colour swatches with names, for choosing one colour.",
    usage: "Use it for colour choices like an accent, a label or a notebook colour. Each swatch has a name under it.",
    propDescriptions: {
        label: "Names the choice for screen readers.",
    },
    examples: {
        accents: {
            title: "Every Passui accent",
            description:
                "The seven accents from Passui's tokens, with the chosen one previewed on a button.",
        },
        labels: {
            title: "Labels for tags",
            description:
                "Small sets of colors for labelling things, each swatch named for screen readers.",
        },
    },
    anatomy: [
        {
            element: "Swatch",
            description:
                "A round colour; the chosen one shows a check in its ink colour.",
            required: true,
        },
        {
            element: "Name",
            description:
                "The colour's name under each swatch.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Name every colour, so it does not rely on colour vision.",
        },
        {
            kind: "do",
            text: "Preview the result next to the picker.",
        },
        {
            kind: "dont",
            text: "Offer so many colours that they wrap into many rows.",
        },
    ],
    accessibility: [
        "Built on radio inputs, so arrow keys move between colours.",
        "Each swatch is named, never colour only.",
    ],
}
