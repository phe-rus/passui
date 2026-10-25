import type { dialogDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const dialogContent: ComponentContent<
    typeof dialogDocs
> = {
    summary:
        "A focused question or short form over the page, with a title, an optional description and a footer of actions.",
    usage: "Use it when people must finish or cancel something before going on: renaming, confirming a sign out, adding an email. For a plain yes or no, await confirmDialog instead.",
    propDescriptions: {
        title: "The dialog's heading, which also names it for screen readers.",
        description:
            "A line under the title that explains what happens next.",
        presentation:
            "Drawer rises from the bottom on phones and floats in the middle on larger screens. Center does the same today. Inline unfolds in place, inside the page.",
        destructive:
            "The tone of Dialog.Actions: a red action for something that can't be undone.",
    },
    examples: {
        form: {
            title: "With a form",
            description:
                "onSubmit makes the dialog a form, so Enter submits it and Dialog.Actions' main button is the submit button.",
        },
        confirm: {
            title: "Confirm with a promise",
            description:
                "confirmDialog shows a ready-made yes or no and resolves true when confirmed. It needs one DialogHost in the app.",
        },
        inline: {
            title: "Inline",
            description:
                "Unfolds under its trigger instead of covering the page, for small edits in a list.",
        },
    },
    anatomy: [
        {
            element: "Title",
            description: "Says what the dialog is for.",
            required: true,
        },
        {
            element: "Description",
            description: "An optional line of context.",
        },
        {
            element: "Content",
            description: "Children, such as form fields.",
        },
        {
            element: "Dialog.Actions",
            description:
                "The main action and a Cancel that closes the dialog.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Name the main action with a verb that says what happens: Sign out, Rename, Delete.",
        },
        {
            kind: "do",
            text: "Use the destructive tone only for actions that can't be undone.",
        },
        {
            kind: "dont",
            text: "Open a dialog from a dialog. Finish one task before starting the next.",
        },
    ],
    accessibility: [
        "Opens as a modal dialog labelled by its title, and moves focus inside.",
        "Escape or a tap outside closes it, and focus goes back to what opened it.",
    ],
}
