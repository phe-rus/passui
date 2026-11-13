import { ToggleGroupIcons } from "../examples/toggle-group/icons";
import { ToggleGroupMultiple } from "../examples/toggle-group/multiple";
import { ToggleGroupSingle } from "../examples/toggle-group/single";
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
		{
			id: "single",
			title: "One at a time",
			description: "Choose a single value.",
			Demo: ToggleGroupSingle,
		},
		{
			id: "icons",
			title: "Icons",
			description: "Square items for a toolbar.",
			Demo: ToggleGroupIcons,
		},
	],
	accessibility: [
		"Items are buttons with `aria-pressed` (or `aria-checked` in single mode) and arrow key roving focus.",
	],
};
