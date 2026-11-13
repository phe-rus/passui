import { ProgressIndeterminate } from "../examples/progress/indeterminate";
import { ProgressSizes } from "../examples/progress/sizes";
import { ProgressSliderControlled } from "../examples/progress/slider-controlled";
import { ProgressSliderRange } from "../examples/progress/slider-range";
import { ProgressSliderUsage } from "../examples/progress/slider-usage";
import { ProgressSlosh } from "../examples/progress/slosh";
import { ProgressSloshSizes } from "../examples/progress/slosh-sizes";
import { ProgressSloshViscosity } from "../examples/progress/slosh-viscosity";
import { ProgressUsage } from "../examples/progress/usage";
import { ProgressWake } from "../examples/progress/wake";
import { ProgressWakeSizes } from "../examples/progress/wake-sizes";
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
			id: "sizes",
			title: "Sizes",
			description: "`sm`, `md` and `lg` set the track height.",
			Demo: ProgressSizes,
		},
		{
			id: "wake",
			title: "Wake",
			description:
				'`variant="wake"` is the same control as a row of bars. Drag slowly and they fill; drag fast and the bars you pass spring up in your wake.',
			Demo: ProgressWake,
		},
		{
			id: "wake-sizes",
			title: "Wake sizes",
			description:
				"The bars and the reading scale with `size`, and take the accent.",
			Demo: ProgressWakeSizes,
		},
		{
			id: "slosh",
			title: "Slosh",
			description:
				'`variant="slosh"` gives the fill mass. The handle stays under your finger while the accent fill lags, overshoots the end stop and rocks back.',
			Demo: ProgressSlosh,
		},
		{
			id: "slosh-viscosity",
			title: "Slosh viscosity",
			description:
				"`viscosity` 0 is an ordinary slider. Higher is looser liquid.",
			Demo: ProgressSloshViscosity,
		},
		{
			id: "slosh-sizes",
			title: "Slosh sizes",
			description: "Track height and handle scale with `size`.",
			Demo: ProgressSloshSizes,
		},
	],
	accessibility: [
		'Renders `role="progressbar"` with `aria-valuenow`, omitted while indeterminate.',
		"Give it an `aria-label` or `aria-labelledby`.",
		'Slider thumbs have `role="slider"` with value, min and max. Arrow keys step, Home and End jump, and each thumb needs its own `aria-label`.',
		"The pulse is off under reduced motion.",
		'`wake` and `slosh` render `role="slider"` with value, min and max. Arrow keys step, Shift steps by 10, Home and End jump. Reduced motion turns the wake and the slosh off, leaving a plain bar.',
	],
};
