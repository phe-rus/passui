import { ButtonGroupUsage } from "../examples/button-group/usage";
import { ButtonGroupVertical } from "../examples/button-group/vertical";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Inner corners are squared; the ends stay round.",
			Demo: ButtonGroupUsage,
		},
		{
			id: "vertical",
			title: "Vertical",
			description: "Stack the buttons in a column.",
			Demo: ButtonGroupVertical,
		},
	],
	accessibility: [
		'The group has `role="group"`. Add an `aria-label` when its purpose is not clear from the buttons.',
	],
};
