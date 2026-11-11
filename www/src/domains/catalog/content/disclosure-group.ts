import type { disclosureGroupDocs } from "@/domains/catalog/definitions";
import type { ComponentContent } from "../types";

export const disclosureGroupContent: ComponentContent<
	typeof disclosureGroupDocs
> = {
	summary:
		"A labelled expandable row with a smooth, in-place reveal for settings and details.",
	usage:
		"Use DisclosureGroup for short details that belong directly beneath a heading or setting.",
	propDescriptions: {
		label: "The visible and accessible name of the group.",
		description: "A brief explanation beneath the label.",
		disabled: "Prevents the group from opening or closing.",
	},
	examples: {
		settings: {
			title: "Additional settings",
			description: "Reveal optional settings without covering the page.",
		},
		disabled: {
			title: "Managed group",
			description: "A collapsed row that cannot be changed.",
		},
	},
	anatomy: [
		{
			element: "Heading button",
			description: "Controls the expanded state.",
			required: true,
		},
		{
			element: "Chevron",
			description: "Rotates to show open or closed state.",
			required: true,
		},
		{
			element: "Content region",
			description: "Labelled by its trigger and revealed beneath it.",
			required: true,
		},
	],
	practices: [
		{ kind: "do", text: "Use clear labels that make sense when collapsed." },
		{ kind: "do", text: "Keep the revealed content relevant to its heading." },
		{
			kind: "dont",
			text: "Use DisclosureGroup for actions requiring a modal decision.",
		},
	],
	accessibility: [
		"The heading button reports aria-expanded and controls a labelled region.",
		"InlineDisclosure honors the system's reduced-motion preference.",
	],
};
