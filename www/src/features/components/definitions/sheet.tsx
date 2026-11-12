import { SheetSides } from "../examples/sheet/sides";
import { SheetUsage } from "../examples/sheet/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
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
