import { SpinnerInButton } from "../examples/spinner/in-button";
import { SpinnerUsage } from "../examples/spinner/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Takes the text colour and size you give it.",
			Demo: SpinnerUsage,
		},
		{
			id: "in-button",
			title: "In a button",
			description: "Pair it with a disabled button while work runs.",
			Demo: SpinnerInButton,
		},
	],
	accessibility: [
		'Renders `role="status"` labelled Loading. Slows rather than stops under reduced motion.',
	],
};
