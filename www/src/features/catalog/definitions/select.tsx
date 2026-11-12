import { SelectControlled } from "../examples/select/controlled";
import { SelectForm } from "../examples/select/form";
import { SelectUsage } from "../examples/select/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Opens a listbox beside the trigger.",
			Demo: SelectUsage,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Read the chosen value from `onValueChange`.",
			Demo: SelectControlled,
		},
		{
			id: "form",
			title: "In a form",
			description: "A hidden native `select` submits the value under `name`.",
			Demo: SelectForm,
		},
	],
	accessibility: [
		'The trigger is a button with `aria-haspopup="listbox"`. Arrow keys, Home, End and typeahead move the highlight.',
		"Escape closes and returns focus to the trigger.",
	],
};
