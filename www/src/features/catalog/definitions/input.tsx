import { InputDisabled } from "../examples/input/disabled";
import { InputField } from "../examples/input/field";
import { InputTypes } from "../examples/input/types";
import { InputUsage } from "../examples/input/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A native input; every attribute passes through.",
			Demo: InputUsage,
		},
		{
			id: "types",
			title: "Types and states",
			description: "File, disabled and invalid.",
			Demo: InputTypes,
		},
		{
			id: "disabled",
			title: "Disabled",
			description: "Dimmed, and not focusable.",
			Demo: InputDisabled,
		},
		{
			id: "field",
			title: "With a label and a hint",
			description: "Compose the parts of a field.",
			Demo: InputField,
		},
	],
	accessibility: [
		"Always give an input a visible `Label` or an `aria-label`.",
		"`aria-invalid` draws the danger ring.",
	],
};
