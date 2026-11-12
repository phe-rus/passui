import type { accordionDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const accordionContent: ComponentContent<typeof accordionDocs> = {
	summary: "Organize related details into one collapsible group at a time.",
	usage:
		"Use Accordion for a set of related sections where opening one section should close the previous one.",
	propDescriptions: {
		title: "Sets the title of the first section in the live example.",
	},
	examples: {
		faq: {
			title: "Frequently asked questions",
			description: "Keep answers close to their questions.",
		},
		settings: {
			title: "Grouped preferences",
			description: "Reveal one set of settings at a time.",
		},
	},
	anatomy: [
		{
			element: "Section button",
			description: "Toggles one section and reports its expanded state.",
			required: true,
		},
		{
			element: "Content region",
			description: "Remains associated with its heading while it expands.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Use concise headings that still make sense when collapsed.",
		},
		{
			kind: "do",
			text: "Use a single accordion when sections are alternatives within one topic.",
		},
		{
			kind: "dont",
			text: "Hide unrelated primary navigation inside an accordion.",
		},
	],
	accessibility: [
		"Each section button exposes aria-expanded and controls a labelled region.",
		"The selected state is controlled by the app, so it can be restored or shared.",
	],
};
