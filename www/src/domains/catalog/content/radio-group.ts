import type { radioGroupDocs } from "../definitions";
import type { ComponentContent } from "../types";
export const radioGroupContent: ComponentContent<typeof radioGroupDocs> = {
	summary: "Compare a small set of mutually exclusive choices.",
	usage: "Compare a small set of mutually exclusive choices.",
	propDescriptions: {
		label: "Localized label describing the control or loading state.",
	},
	examples: {
		compact: {
			title: "A compact choice group",
			description: "Compare a small set of mutually exclusive choices.",
		},
		disabled: {
			title: "Disabled group",
			description: "Compare a small set of mutually exclusive choices.",
		},
	},
	anatomy: [
		{
			element: "Content",
			description: "Compare a small set of mutually exclusive choices.",
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
		"Labels and values remain available to assistive technologies.",
	],
};
