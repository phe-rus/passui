import { ComboboxControlled } from "../examples/combobox/controlled";
import { ComboboxUsage } from "../examples/combobox/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Type to filter; arrow keys and Enter choose.",
			Demo: ComboboxUsage,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Read the chosen value from `onValueChange`.",
			Demo: ComboboxControlled,
		},
	],
	accessibility: [
		'The input has `role="combobox"` with `aria-expanded`, `aria-controls` and an active descendant.',
		"Escape closes the list; Enter picks the highlighted item.",
	],
};
