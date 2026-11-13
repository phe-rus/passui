import { SeparatorDecorative } from "../examples/separator/decorative";
import { SeparatorLabelled } from "../examples/separator/labelled";
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
		{
			id: "decorative",
			title: "Between sections",
			description: "A rule that separates groups of content.",
			Demo: SeparatorDecorative,
		},
		{
			id: "labelled",
			title: "In a toolbar",
			description: "A vertical rule between groups of tools.",
			Demo: SeparatorLabelled,
		},
	],
	accessibility: [
		'Decorative by default (`role="none"`). Pass `decorative={false}` for a true `separator` role.',
	],
};
