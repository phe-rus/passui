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
	],
	accessibility: [
		"Always give an input a visible `Label` or an `aria-label`.",
		"`aria-invalid` draws the danger ring.",
	],
};
