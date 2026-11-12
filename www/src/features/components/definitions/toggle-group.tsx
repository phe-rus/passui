import { ToggleGroupMultiple } from "../examples/toggle-group/multiple";
import { ToggleGroupUsage } from "../examples/toggle-group/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Single",
			description: "Only one stays on unless `multiple` is set.",
			Demo: ToggleGroupUsage,
		},
		{
			id: "multiple",
			title: "Multiple",
			description: "Any number can be on at once.",
			Demo: ToggleGroupMultiple,
		},
	],
	accessibility: [
		"Items are buttons with `aria-pressed` (or `aria-checked` in single mode) and arrow key roving focus.",
	],
};
