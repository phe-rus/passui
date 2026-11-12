import { ProgressIndeterminate } from "../examples/progress/indeterminate";
import { ProgressSliderControlled } from "../examples/progress/slider-controlled";
import { ProgressSliderRange } from "../examples/progress/slider-range";
import { ProgressSliderUsage } from "../examples/progress/slider-usage";
import { ProgressUsage } from "../examples/progress/usage";
import { ProgressWakeSlider } from "../examples/progress/wake-slider";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A determinate bar from 0 to `max`.",
			Demo: ProgressUsage,
		},
		{
			id: "indeterminate",
			title: "Indeterminate",
			description: "With no value the bar pulses.",
			Demo: ProgressIndeterminate,
		},
		{
			id: "slider-usage",
			title: "Slider",
			description:
				"A progress bar you can drag is a Slider: the same track and fill, with a thumb and a value you set.",
			Demo: ProgressSliderUsage,
		},
		{
			id: "slider-range",
			title: "Slider range",
			description: "Pass an array for two thumbs.",
			Demo: ProgressSliderRange,
		},
		{
			id: "slider-controlled",
			title: "Slider controlled",
			description: "`onValueChange` receives an array.",
			Demo: ProgressSliderControlled,
		},
		{
			id: "wake-slider",
			title: "Wake slider",
			description: "A slider whose thumb trails a wake of motion.",
			Demo: ProgressWakeSlider,
		},
	],
	accessibility: [
		'Renders `role="progressbar"` with `aria-valuenow`, omitted while indeterminate.',
		"Give it an `aria-label` or `aria-labelledby`.",
		'Slider thumbs have `role="slider"` with value, min and max. Arrow keys step, Home and End jump, and each thumb needs its own `aria-label`.',
		"The pulse is off under reduced motion.",
	],
};
