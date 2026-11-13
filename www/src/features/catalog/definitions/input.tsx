import { InputDisabled } from "../examples/input/disabled";
import { InputField } from "../examples/input/field";
import { InputFloating } from "../examples/input/floating";
import { InputSizes } from "../examples/input/sizes";
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
			id: "floating",
			title: "Floating label",
			description:
				'`variant="floating"` draws one whole outline. As the label lifts into the top edge, the line parts under it, so nothing is painted over the border and it fits any surface. Focus takes the accent.',
			Demo: InputFloating,
		},
		{
			id: "sizes",
			title: "Sizes",
			description: "`sm`, `md` and `lg` follow the shared control scale.",
			Demo: InputSizes,
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
