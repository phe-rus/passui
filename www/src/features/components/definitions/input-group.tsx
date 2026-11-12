import { InputGroupTrailing } from "../examples/input-group/trailing";
import { InputGroupUsage } from "../examples/input-group/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Addons share one surface and focus ring with the input.",
			Demo: InputGroupUsage,
		},
		{
			id: "trailing",
			title: "Trailing addon",
			description: 'Use `align="end"` for text or a button after the input.',
			Demo: InputGroupTrailing,
		},
	],
	accessibility: [
		'The group has `role="group"`. The input inside still needs its own label.',
	],
};
