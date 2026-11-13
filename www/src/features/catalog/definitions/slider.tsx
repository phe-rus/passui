import { SliderRange } from "../examples/slider/range";
import { SliderUsage } from "../examples/slider/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A single thumb. Arrow keys, Home and End all work.",
			Demo: SliderUsage,
		},
		{
			id: "range",
			title: "Range",
			description: "Pass an array to `value` for two or more thumbs.",
			Demo: SliderRange,
		},
	],
	accessibility: [
		"Each thumb is a focusable slider with a hidden native input, so it submits with forms.",
	],
};
