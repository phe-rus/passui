import type { textEditorDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const textEditorContent: ComponentContent<
    typeof textEditorDocs
> = {
    summary:
        "A multi-line text area that matches the look of Passui's text fields and grows when dragged.",
    usage: "Use it for text that runs past one line: a bio, a message, a note. Give it a visible label.",
    propDescriptions: {
        placeholder:
            "An example of what to write. Never a replacement for the label.",
        disabled:
            "Shows the text but blocks editing and skips it when tabbing.",
        readOnly:
            "Shows the text and lets people select and copy it, without editing.",
    },
    examples: {
        count: {
            title: "Character count",
            description:
                "maxLength with a live count under the field, linked with aria-describedby.",
        },
        comment: {
            title: "Comment box",
            description:
                "A labelled editor with Cancel and Post, Post enabled once there's text.",
        },
    },
    anatomy: [
        {
            element: "Label",
            description:
                "Supplied by the app and linked with htmlFor.",
            required: true,
        },
        {
            element: "Text area",
            description:
                "Starts at about four lines and can be resized taller.",
            required: true,
        },
        {
            element: "Helper line",
            description:
                "An optional count or hint placed under it by the app.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Link a label with htmlFor and id, or give it aria-label.",
        },
        {
            kind: "do",
            text: "Show a count when there is a limit, so people aren't cut off by surprise.",
        },
        {
            kind: "dont",
            text: "Use it for one-line values like names or emails; use TextField.",
        },
    ],
    accessibility: [
        "A native textarea, so typing, selection and dictation work as people expect.",
        "It has no label of its own: link one with htmlFor and id, or use aria-label.",
    ],
}
