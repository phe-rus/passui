import { TextareaControlled } from "../examples/textarea/controlled";
import { TextareaDisabled } from "../examples/textarea/disabled";
import { TextareaRows } from "../examples/textarea/rows";
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
		{
			id: "rows",
			title: "With a hint",
			description: "Pair it with a label and a line of help.",
			Demo: TextareaRows,
		},
		{
			id: "controlled",
			title: "Controlled with a counter",
			description: "Count characters as the person types.",
			Demo: TextareaControlled,
		},
	],
	accessibility: [
		"Pair with a `Label` or `aria-label`; `aria-invalid` draws the danger ring.",
	],
};
