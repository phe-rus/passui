import { LabelNested } from "../examples/label/nested";
import { LabelUsage } from "../examples/label/usage";
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
	],
	accessibility: [
		"A native `label`. Prefer `htmlFor` with an `id`, or wrap the control.",
	],
};
