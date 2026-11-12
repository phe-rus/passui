import type { breadcrumbDocs } from "..";
import type { ComponentContent } from "../../types";
export const breadcrumbContent: ComponentContent<typeof breadcrumbDocs> = {
	summary: "Show the current page within a hierarchy of linked ancestors.",
	usage: "Show the current page within a hierarchy of linked ancestors.",
	propDescriptions: {
		label: "Localized label describing the control or loading state.",
	},
	examples: {
		short: {
			title: "A short path",
			description:
				"Show the current page within a hierarchy of linked ancestors.",
		},
		current: {
			title: "Current location",
			description:
				"Show the current page within a hierarchy of linked ancestors.",
		},
	},
	anatomy: [
		{
			element: "Content",
			description:
				"Show the current page within a hierarchy of linked ancestors.",
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
