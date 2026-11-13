import { RadioGroupControlled } from "../examples/radio-group/controlled";
import { RadioGroupDisabled } from "../examples/radio-group/disabled";
import { RadioGroupForm } from "../examples/radio-group/form";
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
		{
			id: "disabled",
			title: "A disabled choice",
			description: "One option can be unavailable.",
			Demo: RadioGroupDisabled,
		},
		{
			id: "form",
			title: "In a form",
			description: "Submits the chosen value with the form.",
			Demo: RadioGroupForm,
		},
	],
	accessibility: [
		'`role="radiogroup"` over native radio inputs, with a roving arrow key tab stop.',
	],
};
