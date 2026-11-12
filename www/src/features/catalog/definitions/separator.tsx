import { SeparatorUsage } from "../examples/separator/usage";
import { SeparatorVertical } from "../examples/separator/vertical";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Horizontal by default.",
			Demo: SeparatorUsage,
		},
		{
			id: "vertical",
			title: "Vertical",
			description: "Give the parent a height.",
			Demo: SeparatorVertical,
		},
	],
	accessibility: [
		'Decorative by default (`role="none"`). Pass `decorative={false}` for a true `separator` role.',
	],
};
