import { SloshSliderUsage } from "../examples/slosh-slider/usage";
import { SloshSliderViscosity } from "../examples/slosh-slider/viscosity";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"The handle follows your finger exactly; the fill lags behind it like liquid and rocks back when you let go.",
			Demo: SloshSliderUsage,
		},
		{
			id: "viscosity",
			title: "Viscosity",
			description:
				"`viscosity` 0 is an ordinary slider. Higher values make the fill looser, with more overshoot.",
			Demo: SloshSliderViscosity,
		},
	],
	accessibility: [
		'A `role="slider"` with arrow keys (Shift for 10), Home and End. Reduce Motion turns the liquid off, leaving a plain slider.',
	],
};
