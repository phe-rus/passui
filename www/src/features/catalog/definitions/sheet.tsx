import { SheetControlled } from "../examples/sheet/controlled";
import { SheetFilters } from "../examples/sheet/filters";
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
		{
			id: "filters",
			title: "A form in a sheet",
			description:
				"Hold `open` yourself so Apply can close the sheet after it saves.",
			Demo: SheetFilters,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Own the open state to close it from your own code.",
			Demo: SheetControlled,
		},
	],
	accessibility: [
		"A modal dialog: focus is trapped, Escape closes it, and focus returns to the trigger.",
		"Swiping is optional. The close part and Escape always work.",
		"The panel sizes itself from the visual viewport so inputs stay above the soft keyboard.",
		"Slides become fades under reduced motion.",
	],
};
