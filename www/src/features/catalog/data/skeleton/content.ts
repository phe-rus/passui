import type { ComponentContent } from "../../types";
import type { skeletonDocs } from "..";
export const skeletonContent: ComponentContent<typeof skeletonDocs> = {
	summary:
		"Reserve space while content is loading, with optional spoken status.",
	usage: "Reserve space while content is loading, with optional spoken status.",
	propDescriptions: {
		label: "Localized label describing the control or loading state.",
	},
	examples: {
		text: {
			title: "Text placeholder",
			description:
				"Reserve space while content is loading, with optional spoken status.",
		},
		profile: {
			title: "Profile placeholder",
			description:
				"Reserve space while content is loading, with optional spoken status.",
		},
	},
	anatomy: [
		{
			element: "Content",
			description:
				"Reserve space while content is loading, with optional spoken status.",
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
