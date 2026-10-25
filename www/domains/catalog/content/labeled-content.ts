import type { labeledContentDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const labeledContentContent: ComponentContent<
    typeof labeledContentDocs
> = {
    summary:
        "A settings row: a label and description, with a control or value at the trailing edge.",
    usage: "Use it inside a Section for each setting. Wide controls move under the label on their own when space runs out.",
    propDescriptions: {
        label: "What the row is about.",
        description:
            "An optional second line that explains it.",
        stacked:
            "Puts the control under the label, for wide controls like text fields.",
        wide: "For a wide control that should move under the label on phones only.",
    },
    examples: {
        descriptions: {
            title: "With descriptions",
            description:
                "A second line under each label explains the setting, while the control stays at the end of the row.",
        },
        wide: {
            title: "Wide controls",
            description:
                "wide moves a segmented control under its label on phones, and stacked always puts it underneath.",
        },
        values: {
            title: "Read-only values",
            description:
                "Plain text as the trailing content, for details people can read but not change here.",
        },
    },
    anatomy: [
        {
            element: "Label",
            description: "The row's name.",
            required: true,
        },
        {
            element: "Description",
            description:
                "An optional explanation under the label.",
        },
        {
            element: "Trailing content",
            description:
                "A control or a value at the end of the row.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep descriptions to one short sentence.",
        },
        {
            kind: "do",
            text: "Use stacked for text fields so they get the full width.",
        },
        {
            kind: "dont",
            text: "Put two controls in one row; give each its own.",
        },
    ],
    accessibility: [
        "Give the control inside its own label too, hidden if the row already shows it.",
        "The label stays readable before the control shrinks.",
    ],
}
