import { ProgressIndeterminate } from "../examples/progress/indeterminate";
import { ProgressUsage } from "../examples/progress/usage";
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
	],
	accessibility: [
		'Renders `role="progressbar"` with `aria-valuenow`, omitted while indeterminate.',
		"Give it an `aria-label` or `aria-labelledby`.",
		"The pulse is off under reduced motion.",
	],
};
