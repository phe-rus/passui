import { KeyboardShortcut } from "@passui/react/keyboard-shortcut"

export function KeyboardShortcutCommand() {
    return (
        <span className="flex items-center gap-3 text-subheadline">
            Search <KeyboardShortcut>⌘ K</KeyboardShortcut>
        </span>
    )
}
