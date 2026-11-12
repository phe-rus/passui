import { SliderControlled } from "../examples/slider/controlled";
import { SliderRange } from "../examples/slider/range";
import { SliderUsage } from "../examples/slider/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A single thumb.",
			Demo: SliderUsage,
		},
		{
			id: "range",
			title: "Range",
			description: "Pass an array for two thumbs.",
			Demo: SliderRange,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "`onValueChange` receives an array.",
			Demo: SliderControlled,
		},
	],
	accessibility: [
		'Each thumb has `role="slider"` with value, min and max. Arrow keys step, Home and End jump.',
		"Pass one `aria-label` per thumb.",
	],
};
