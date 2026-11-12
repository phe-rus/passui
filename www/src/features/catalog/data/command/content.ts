import type { ComponentContent } from "../../types";
import type { commandDocs } from "..";
export const commandContent: ComponentContent<typeof commandDocs> = {
	summary:
		"A compact command palette for finding destinations and performing quick actions.",
	usage:
		"Compose an input, results, groups and actions. Use CommandDialog for a modal palette with focus restoration; use Command for an inline surface.",
	propDescriptions: {
		placeholder: "Localized prompt for finding commands.",
		empty: "Shown when no enabled command matches.",
	},
	examples: {
		dialog: {
			title: "Quick actions dialog",
			description:
				"Open a focused palette, perform an action, then return to its trigger.",
		},
		keywords: {
			title: "Keywords and unavailable actions",
			description:
				"Search synonyms without lengthening visible labels. Disabled actions stay unavailable.",
		},
	},
	anatomy: [
		{
			element: "CommandInput",
			description: "Search field with an anchored search icon.",
			required: true,
		},
		{
			element: "CommandList",
			description: "Scrollable keyboard navigable results.",
			required: true,
		},
		{ element: "CommandGroup", description: "A named set of related actions." },
		{
			element: "CommandItem",
			description: "One action, with optional icon and shortcut.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Group destinations separately from actions and provide concise localized labels.",
		},
		{
			kind: "do",
			text: "Wire keyboard shortcuts in the application; CommandShortcut displays a hint and does not install a global handler.",
		},
	],
	accessibility: [
		"Arrow keys move through enabled matches and Enter runs the active action.",
		"CommandDialog traps focus, closes with Escape and restores the opener.",
	],
};
