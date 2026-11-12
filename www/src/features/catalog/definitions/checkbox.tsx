import { CheckboxControlled } from "../examples/checkbox/controlled";
import { CheckboxUsage } from "../examples/checkbox/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Children are the label.",
			Demo: CheckboxUsage,
		},
		{
			id: "controlled",
			title: "Controlled and mixed",
			description: "`indeterminate` shows a dash for a partly selected group.",
			Demo: CheckboxControlled,
		},
	],
	accessibility: [
		'A real hidden `input type="checkbox"` backs it, so forms and autofill work.',
		"Space toggles. A mixed state is announced as `mixed`.",
	],
};
