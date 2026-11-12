import { TextareaDisabled } from "../examples/textarea/disabled";
import { TextareaUsage } from "../examples/textarea/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Grows with its content where `field-sizing` is supported.",
			Demo: TextareaUsage,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Native attributes pass through.",
			Demo: TextareaDisabled,
		},
	],
	accessibility: [
		"Pair with a `Label` or `aria-label`; `aria-invalid` draws the danger ring.",
	],
};
