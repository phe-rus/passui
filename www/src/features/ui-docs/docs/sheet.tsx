import { SheetSides } from "../examples/sheet-sides";
import { SheetUsage } from "../examples/sheet-usage";
import type { UiDoc } from "../types";
import { openProps, renderProp } from "./_shared";

export const doc: UiDoc = {
	slug: "sheet",
	name: "Sheet",
	group: "Presentation",
	icon: "panel",
	summary:
		"A panel that slides in from any edge and swipes away, on the Zag drawer machine with the iOS sheet curve over 500 ms.",
	entry: "@passui/react/sheet",
	sizeKb: 29,
	parts: [
		{
			name: "Sheet",
			description: "Owns the open state and swipe direction.",
			props: [
				...openProps,
				{
					name: "side",
					type: '"top" | "right" | "bottom" | "left"',
					default: '"right"',
					description: "The edge it slides from. Honours right to left.",
				},
			],
		},
		{
			name: "SheetTrigger",
			description: "Opens the sheet.",
			props: [renderProp],
		},
		{
			name: "SheetContent",
			description: "Backdrop and panel.",
			props: [renderProp],
		},
		{ name: "SheetHeader", description: "Stacks the title and description." },
		{ name: "SheetTitle", description: "Names the sheet." },
		{ name: "SheetDescription", description: "Describes the sheet." },
		{ name: "SheetFooter", description: "Holds the actions." },
		{
			name: "SheetClose",
			description: "Closes the sheet.",
			props: [renderProp],
		},
	],
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Slides in from the right by default.",
			Demo: SheetUsage,
		},
		{
			id: "sides",
			title: "Sides",
			description: "Each side swipes away in its own direction.",
			Demo: SheetSides,
		},
	],
	accessibility: [
		"A modal dialog: focus is trapped, Escape closes it, and focus returns to the trigger.",
		"Swiping is optional. The close part and Escape always work.",
		"The panel sizes itself from the visual viewport so inputs stay above the soft keyboard.",
		"Slides become fades under reduced motion.",
	],
};
