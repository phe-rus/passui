import { LabelNested } from "../examples/label/nested";
import { LabelRequired } from "../examples/label/required";
import { LabelUsage } from "../examples/label/usage";
import { LabelWithCheckbox } from "../examples/label/with-checkbox";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Clicking the label focuses its control.",
			Demo: LabelUsage,
		},
		{
			id: "nested",
			title: "Wrapping a control",
			description: "A label can wrap its control instead of using `htmlFor`.",
			Demo: LabelNested,
		},
		{
			id: "required",
			title: "A required field",
			description: "Mark it in the label text, not with color alone.",
			Demo: LabelRequired,
		},
		{
			id: "with-checkbox",
			title: "Beside a checkbox",
			description: "Clicking the label toggles the box.",
			Demo: LabelWithCheckbox,
		},
	],
	accessibility: [
		"A native `label`. Prefer `htmlFor` with an `id`, or wrap the control.",
	],
};
