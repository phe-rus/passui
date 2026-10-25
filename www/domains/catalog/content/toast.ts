import type { toastDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const toastContent: ComponentContent<
    typeof toastDocs
> = {
    summary:
        "A short message that drops from the top like an island to confirm, show progress or explain a failure, then leaves on its own.",
    usage: "Call toast from anywhere, including outside React. Render one Toaster near the root of the app.",
    propDescriptions: {
        tone: "Which call: toast for a plain note, or toast.success, toast.error or toast.loading.",
        title: "The message, short enough to read at a glance.",
        description:
            "The description option: a second line with detail.",
    },
    examples: {
        action: {
            title: "With an action",
            description:
                "An Undo button in the toast, for actions that are easy to reverse.",
        },
        promise: {
            title: "Following a promise",
            description:
                "toast.promise shows progress, then morphs into success or failure once the promise settles.",
        },
    },
    anatomy: [
        {
            element: "Icon",
            description:
                "A small pill showing the tone: a check, a warning or a spinner.",
        },
        {
            element: "Message",
            description:
                "The title and optional description, flowing out of the pill.",
            required: true,
        },
        {
            element: "Action",
            description: "An optional button, such as Undo.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Confirm what happened in a few words: Changes saved, Link copied.",
        },
        {
            kind: "do",
            text: "Offer Undo instead of asking for confirmation, when an action is easy to reverse.",
        },
        {
            kind: "dont",
            text: "Put anything people must act on in a toast. It leaves on its own.",
        },
    ],
    accessibility: [
        "Toasts sit in a polite live region, so screen readers announce them without interrupting.",
        "Hovering over the toasts pauses them, so there's time to read and reach an action.",
    ],
}
