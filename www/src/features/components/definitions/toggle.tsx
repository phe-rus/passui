import { ToggleOutline } from "../examples/toggle/outline";
import { ToggleUsage } from "../examples/toggle/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A button with `aria-pressed`.",
			Demo: ToggleUsage,
		},
		{
			id: "outline",
			title: "Outline",
			description: "The outline variant keeps a hairline when off.",
			Demo: ToggleOutline,
		},
	],
	accessibility: [
		"A native button with `aria-pressed`. An icon only toggle needs an `aria-label`.",
	],
};
