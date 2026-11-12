import { RadioGroupControlled } from "../examples/radio-group/controlled";
import { RadioGroupUsage } from "../examples/radio-group/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Arrow keys move and select.",
			Demo: RadioGroupUsage,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Read the choice from `onValueChange`.",
			Demo: RadioGroupControlled,
		},
	],
	accessibility: [
		'`role="radiogroup"` over native radio inputs, with a roving arrow key tab stop.',
	],
};
