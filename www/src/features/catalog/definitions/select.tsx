import { SelectControlled } from "../examples/select/controlled";
import { SelectDisabled } from "../examples/select/disabled";
import { SelectForm } from "../examples/select/form";
import { SelectUsage } from "../examples/select/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"The trigger swells into the listbox and drops back on close, with the chosen option landing over the trigger's value.",
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
		{
			id: "disabled",
			title: "Disabled options",
			description: "An option can be listed but not chosen.",
			Demo: SelectDisabled,
		},
	],
	accessibility: [
		'The trigger is a button with `aria-haspopup="listbox"`. Arrow keys, Home, End and typeahead move the highlight.',
		"Escape closes and returns focus to the trigger.",
	],
};
