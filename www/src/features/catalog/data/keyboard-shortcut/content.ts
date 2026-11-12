import type { ComponentContent } from "../../types";
import type { keyboardShortcutDocs } from "..";
export const keyboardShortcutContent: ComponentContent<
	typeof keyboardShortcutDocs
> = {
	summary: "A compact keycap for application keyboard commands.",
	usage: "A compact keycap for application keyboard commands.",
	propDescriptions: {
		children: "Text shown in the component.",
	},
	examples: {
		command: {
			title: "Command hint",
			description: "Place a shortcut beside its action.",
		},
		navigation: {
			title: "Navigation keys",
			description: "Show individual keys with readable separators.",
		},
	},
	anatomy: [
		{
			element: "Content",
			description:
				"Semantic keycap containing an application supplied shortcut.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Use concise, localized labels that describe the current context.",
		},
	],
	accessibility: [
		"Source content and text remain available to assistive technologies.",
	],
};
