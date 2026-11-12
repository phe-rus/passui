import { DialogForm } from "../examples/dialog/form";
import { DialogScrollable } from "../examples/dialog/scrollable";
import { DialogUsage } from "../examples/dialog/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"Triggers and close parts become your own button through `render`.",
			Demo: DialogUsage,
		},
		{
			id: "form",
			title: "Controlled form",
			description:
				"Hold `open` yourself so the form can close the dialog when it saves.",
			Demo: DialogForm,
		},
		{
			id: "scrollable",
			title: "Scrollable with a sticky footer",
			description:
				"A long dialog scrolls inside its panel; keep the actions in view with a sticky footer.",
			Demo: DialogScrollable,
		},
	],
	accessibility: [
		"The panel has role `dialog` and is named by `DialogTitle` and described by `DialogDescription`.",
		"Focus moves in on open, stays inside while open, and returns to the trigger on close.",
		"Escape and an outside press close it. Scroll locks until the last layer closes.",
		"A focused input stays above the soft keyboard through `--visual-viewport-height`.",
		"Slides become fades under reduced motion.",
	],
};
