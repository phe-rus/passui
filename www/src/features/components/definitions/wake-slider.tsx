import { WakeSliderDisabled } from "../examples/wake-slider/disabled";
import { WakeSliderQuiet } from "../examples/wake-slider/quiet";
import { WakeSliderShowcase } from "../examples/wake-slider/showcase";
import { WakeSliderUsage } from "../examples/wake-slider/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "disabled",
			title: "Disabled",
			description: "An unavailable state that keeps its label and value.",
			Demo: WakeSliderDisabled,
		},
		{
			id: "quiet",
			title: "Quiet",
			description:
				"Use the same native control with a different interaction setting.",
			Demo: WakeSliderQuiet,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: WakeSliderShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: WakeSliderUsage },
	],
	accessibility: [
		"Give the control a localized label and meaningful formatValue for units such as time.",
	],
};
