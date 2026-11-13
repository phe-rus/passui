import { ComboboxControlled } from "../examples/combobox/controlled";
import { ComboboxDefault } from "../examples/combobox/default";
import { ComboboxMany } from "../examples/combobox/many";
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
		{
			id: "many",
			title: "A long list",
			description: "Typing narrows it, and Enter picks the first match.",
			Demo: ComboboxMany,
		},
		{
			id: "default",
			title: "With a starting value",
			description: "Starts on a choice and still lets the person change it.",
			Demo: ComboboxDefault,
		},
	],
	accessibility: [
		'The input has `role="combobox"` with `aria-expanded`, `aria-controls` and an active descendant.',
		"Escape closes the list; Enter picks the highlighted item.",
	],
};
