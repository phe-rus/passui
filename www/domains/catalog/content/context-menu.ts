import type { contextMenuDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const contextMenuContent: ComponentContent<
    typeof contextMenuDocs
> = {
    summary:
        "Actions for one thing, opened by right-clicking on a computer or pressing and holding on a touch screen.",
    usage: "Spread useContextMenu's handlers onto the element, passing a function that returns its rows. Render one ContextMenuHost near the root of the app.",
    propDescriptions: {
        heading:
            "Adds a { heading } row: a small title naming what the menu acts on.",
        destructive:
            "Adds a divider and a destructive row, shown in red, for actions like Delete.",
    },
    examples: {
        toolbar: {
            title: "A menu from its action group",
            description:
                "Pass the action group's element as toolbar to openMenu. The button stretches across the group before unfolding; sibling controls return when it closes.",
        },
        list: {
            title: "Menus on list rows",
            description:
                "Each row has its own menu, built when it opens, so Pin and Unpin follow the row's state.",
        },
        checked: {
            title: "Choices in a menu",
            description:
                "checked marks the current choice, such as the sort order of a list.",
        },
    },
    anatomy: [
        {
            element: "Heading",
            description: "An optional title over the rows.",
        },
        {
            element: "Rows",
            description:
                "Actions with a label and optional icon. They can be disabled, checked or destructive.",
            required: true,
        },
        {
            element: "Divider",
            description: "Separates groups of rows.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Keep destructive rows last, after a divider.",
        },
        {
            kind: "do",
            text: "Also offer the actions somewhere visible. A context menu is a shortcut, not the only way.",
        },
        {
            kind: "dont",
            text: "Fill it with every possible action. Keep the few that matter for this thing.",
        },
    ],
    accessibility: [
        "The menu takes focus when it opens and returns it to the element when it closes.",
        "Long-press menus get bigger rows for fingers.",
        "Context menus are hard to find with a keyboard or screen reader, so put the same actions in a visible menu too.",
    ],
}
