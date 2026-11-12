import type { popoverDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const popoverContent: ComponentContent<typeof popoverDocs> = {
	summary:
		"A glass panel tied to a control, placed within the visible screen, with an optional morph from its trigger.",
	usage:
		"Use it for a little extra detail or a short menu tied to one control, such as an account card or a More menu. Pass the trigger as Popover.Trigger so the glass surface can morph from its shape; Escape and a click outside close it automatically.",
	propDescriptions: {
		origin:
			"The corner it grows from. Use top-right for controls near the end of a row.",
	},
	examples: {
		menu: {
			title: "Action menu",
			description:
				"A short list of actions under a More button, opening from its top-right corner.",
		},
		help: {
			title: "Help beside a field",
			description:
				"A small info button that explains a setting, without leaving the form.",
		},
	},
	anatomy: [
		{
			element: "Popover",
			description:
				"The compound root. Holds state for its Trigger and Content parts.",
			required: true,
		},
		{
			element: "Popover.Trigger",
			description:
				"Wraps the button that opens the popover. Wires aria-haspopup, aria-expanded and click + keyboard toggling.",
			required: true,
		},
		{
			element: "Popover.Content",
			description:
				"The glass panel, placed with className (such as top-full left-0 mt-2). Picks its origin corner and morphs from the trigger.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Close it once an action inside is picked — call onOpenChange on the root, or let the menu item drive navigation.",
		},
		{
			kind: "do",
			text: 'Pass role="menu" when the content is a list of actions, so screen readers announce it as a menu.',
		},
		{
			kind: "dont",
			text: "Put a form that needs focus and care in it. Use a Sheet or Dialog.",
		},
	],
	accessibility: [
		"Give it a role that fits its content (menu or dialog) and a name via label or labelledBy.",
		"Escape and a tap outside close it; focus is trapped inside while open.",
	],
};
