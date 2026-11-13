import { PopoverControlled } from "../examples/popover/controlled";
import { PopoverForm } from "../examples/popover/form";
import { PopoverPlacement } from "../examples/popover/placement";
import { PopoverUsage } from "../examples/popover/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"A trigger and a titled panel. The trigger's glass swells into the panel and drops back on close.",
			Demo: PopoverUsage,
		},
		{
			id: "placement",
			title: "Placement",
			description: "Choose a side. The panel flips when there is no room.",
			Demo: PopoverPlacement,
		},
		{
			id: "form",
			title: "A small form",
			description: "A popover can hold controls, not just text.",
			Demo: PopoverForm,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Own the open state to close it after an action.",
			Demo: PopoverControlled,
		},
	],
	accessibility: [
		"The trigger carries `aria-expanded` and `aria-controls`. The panel has role `dialog`.",
		"Escape and an outside press close it, and focus returns to the trigger.",
		"Focus moves into the panel on open, so keyboard users can reach its controls.",
		"Scale transitions are off under reduced motion.",
	],
};
