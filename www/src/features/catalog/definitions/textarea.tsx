import { TextareaControlled } from "../examples/textarea/controlled";
import { TextareaCount } from "../examples/textarea/count";
import { TextareaDisabled } from "../examples/textarea/disabled";
import { TextareaFloating } from "../examples/textarea/floating";
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
			id: "floating",
			title: "Floating label",
			description: "The same outlined field as `Input`, for several lines.",
			Demo: TextareaFloating,
		},
		{
			id: "count",
			title: "Character count",
			description:
				"`showCount` with `maxLength` shows `count / max` under the field and turns it red at the limit.",
			Demo: TextareaCount,
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
