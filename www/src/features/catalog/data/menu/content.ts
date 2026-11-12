import type { menuDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const menuContent: ComponentContent<typeof menuDocs> = {
	summary:
		"A button that opens an anchored set of commands or choices using PassUI's native menu host.",
	usage:
		"Use Menu for visible actions. Use useContextMenu for right-click and touch shortcuts on content.",
	propDescriptions: {
		label: "Accessible name of the trigger.",
		disabled: "Prevents opening the menu.",
		above: "Positions the menu above the trigger when practical.",
		edge: "Logical leading or trailing alignment, respecting RTL.",
	},
	examples: {
		actions: {
			title: "File actions",
			description: "Named groups and a separated destructive action.",
		},
		choices: {
			title: "Sort order",
			description: "Checked choices reflect the current selection.",
		},
	},
	anatomy: [
		{
			element: "Trigger",
			description: "A visible, accessible Button.",
			required: true,
		},
		{
			element: "Menu surface",
			description: "Positioned and animated by ContextMenuHost.",
			required: true,
		},
		{
			element: "Actions",
			description: "Selectable rows, optional headings and separators.",
			required: true,
		},
	],
	practices: [
		{ kind: "do", text: "Mount one ContextMenuHost near the app root." },
		{
			kind: "do",
			text: "Keep the action list short and put destructive items last.",
		},
		{
			kind: "dont",
			text: "Use Menu for selecting ordinary values; use Picker.",
		},
	],
	accessibility: [
		"The trigger reports its expanded state and supports keyboard opening.",
		"The menu host owns focus, Escape handling, and arrow-key navigation.",
	],
};
