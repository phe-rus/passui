import { SpinnerAccent } from "../examples/spinner/accent";
import { SpinnerInButton } from "../examples/spinner/in-button";
import { SpinnerUsage } from "../examples/spinner/usage";
import { SpinnerWithText } from "../examples/spinner/with-text";
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
		{
			id: "accent",
			title: "Accent",
			description: "It follows the theme's accent.",
			Demo: SpinnerAccent,
		},
		{
			id: "with-text",
			title: "Beside text",
			description: "A spinner with a word says what is happening.",
			Demo: SpinnerWithText,
		},
	],
	accessibility: [
		'Renders `role="status"` labelled Loading. Slows rather than stops under reduced motion.',
	],
};
