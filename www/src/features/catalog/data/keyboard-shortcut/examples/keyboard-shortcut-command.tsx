import { KeyboardShortcut } from "@passui/react/keyboard-shortcut";

export function KeyboardShortcutCommand() {
	return (
		<span className="text-subheadline flex items-center gap-3">
			Search <KeyboardShortcut>⌘ K</KeyboardShortcut>
		</span>
	);
}
