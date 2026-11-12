import type { buttonDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const buttonContent: ComponentContent<typeof buttonDocs> = {
	summary:
		"A pressable control for the actions people take most. Each variant has a little depth, like a well made physical key.",
	usage:
		"Use a button to start an action: saving, sending, confirming or deleting. For moving to another page, style a link with buttonVariants instead.",
	propDescriptions: {
		variant:
			"How much the button stands out. Give each view one default button for its main action.",
		size: "Height and padding. The icon sizes are square and hold an icon instead of a label.",
		disabled: "Dims the button and ignores presses.",
		children: "The label. Say what happens, in a word or two.",
	},
	examples: {
		variants: {
			title: "Variants",
			description:
				"Six levels of emphasis, from the solid default to the quiet link.",
		},
		sizes: {
			title: "Sizes",
			description:
				"Extra small for dense toolbars, default for most places, large for the one big call to action.",
		},
		"with-icon": {
			title: "With icon",
			description:
				"A leading icon helps people find the action faster. Keep the label; the icon only supports it.",
		},
		icon: {
			title: "Icon only",
			description:
				"Square sizes for toolbars and tight rows. Always give them an aria-label.",
		},
		disabled: {
			title: "Disabled",
			description:
				"For actions that are not available yet. Prefer explaining why nearby.",
		},
		link: {
			title: "As a link",
			description:
				"Navigation keeps the button look with buttonVariants on a real link, never a button inside a link.",
		},
	},
	anatomy: [
		{
			element: "Label",
			description:
				"The text that names the action. It is also the accessible name.",
			required: true,
		},
		{
			element: "Icon",
			description:
				"An optional leading icon that supports the label, like a trash can on Delete.",
		},
		{
			element: "Surface",
			description:
				"The pill shape with a fine top highlight and soft layered shadow that gives each variant its depth.",
		},
	],
	practices: [
		{
			kind: "do",
			text: "Give each view one clear main action; make everything else secondary, outline or ghost.",
		},
		{
			kind: "do",
			text: "Write labels as verbs that say what happens: Save changes, Send invite, Delete draft.",
		},
		{
			kind: "do",
			text: "Give icon only buttons an aria-label, and a tooltip for people who use a pointer.",
		},
		{
			kind: "dont",
			text: "Put two default buttons side by side; they compete and neither leads.",
		},
		{
			kind: "dont",
			text: "Use destructive without a confirmation for anything that cannot be undone.",
		},
		{
			kind: "dont",
			text: "Nest a button inside a link for navigation; style the link with buttonVariants.",
		},
	],
	accessibility: [
		"Reachable with Tab and pressed with Space or Enter, like a native button.",
		"The focus ring uses the accent and an offset, so it stays visible on every surface.",
		"Icon only sizes need an aria-label; the label becomes the accessible name.",
		"Disabled buttons leave the tab order; explain nearby why an action is unavailable.",
	],
};
