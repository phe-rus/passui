import { FieldHorizontal } from "../examples/field/horizontal";
import { FieldInvalid } from "../examples/field/invalid";
import { FieldUsage } from "../examples/field/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Label, control, description and error as one unit.",
			Demo: FieldUsage,
		},
		{
			id: "invalid",
			title: "With an error",
			description:
				"`invalid` turns the label red; render `FieldError` only when there is one.",
			Demo: FieldInvalid,
		},
		{
			id: "horizontal",
			title: "Horizontal",
			description: "A switch reads best beside its label.",
			Demo: FieldHorizontal,
		},
	],
	accessibility: [
		'`FieldError` has `role="alert"`. Link it to the control with `aria-describedby`.',
	],
};
