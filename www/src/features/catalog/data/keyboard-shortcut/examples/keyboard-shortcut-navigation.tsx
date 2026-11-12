import { KeyboardShortcut } from "@passui/react/keyboard-shortcut";

export function KeyboardShortcutNavigation() {
	return (
		<span className="flex items-center gap-1">
			<KeyboardShortcut>↑</KeyboardShortcut>
			<KeyboardShortcut>↓</KeyboardShortcut>
			<span className="text-footnote">to navigate</span>
		</span>
	);
}
