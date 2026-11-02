import { KeyboardShortcut, type KeyboardShortcutProps } from "@passui/react/keyboard-shortcut"
import { defineDocs } from "../types"
import { KeyboardShortcutUsage } from "./examples/keyboard-shortcut-usage"
import { KeyboardShortcutShowcase } from "./examples/keyboard-shortcut-showcase"
import { KeyboardShortcutCommand } from "./examples/keyboard-shortcut-command"
import { KeyboardShortcutNavigation } from "./examples/keyboard-shortcut-navigation"
export const keyboardShortcutDocs = defineDocs<KeyboardShortcutProps>()({
    slug: "keyboard-shortcut",
    name: "KeyboardShortcut",
    importPath: "@passui/react/keyboard-shortcut",
    controls: { children: { kind: "text", default: "\u2318 K" } },
    render: (props) => <KeyboardShortcut {...props} />,
    usage: KeyboardShortcutUsage,
    showcase: KeyboardShortcutShowcase,
    examples: [
        { id: "command", component: KeyboardShortcutCommand },
        { id: "navigation", component: KeyboardShortcutNavigation },
    ],
})
