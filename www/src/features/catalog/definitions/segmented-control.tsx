import { SegmentedControlControlled } from "../examples/segmented-control/controlled";
import { SegmentedControlUsage } from "../examples/segmented-control/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A single select toggle group in one pill.",
			Demo: SegmentedControlUsage,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "The value is always one of the options.",
			Demo: SegmentedControlControlled,
		},
	],
	accessibility: [
		"Built on Toggle Group, so each segment is a button with `aria-pressed` and arrow key navigation.",
	],
};
