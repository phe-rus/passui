import { PopoverPlacement } from "../examples/popover-placement";
import { PopoverUsage } from "../examples/popover-usage";
import type { UiDoc } from "../types";
import { openProps, renderProp } from "./_shared";

export const doc: UiDoc = {
	slug: "popover",
	name: "Popover",
	group: "Presentation",
	icon: "bubble",
	summary:
		"A small floating panel beside its trigger, on the Zag popover machine. It flips to stay on screen and grows from its trigger side.",
	entry: "@passui/react/popover",
	sizeKb: 30,
	parts: [
		{
			name: "Popover",
			description: "Owns the open state and position.",
			props: [
				...openProps,
				{
					name: "placement",
					type: "Placement",
					default: '"bottom"',
					description:
						"Where the panel sits against its trigger, such as `top-start`.",
				},
				{
					name: "offset",
					type: "number",
					default: "8",
					description: "Gap between trigger and panel, in pixels.",
				},
				{
					name: "modal",
					type: "boolean",
					default: "false",
					description: "Traps focus inside the panel.",
				},
			],
		},
		{
			name: "PopoverTrigger",
			description: "Toggles the popover.",
			props: [renderProp],
		},
		{
			name: "PopoverAnchor",
			description:
				"Positions the panel against another element instead of the trigger.",
			props: [renderProp],
		},
		{
			name: "PopoverContent",
			description: "The floating panel.",
			props: [renderProp],
		},
		{ name: "PopoverTitle", description: "Names the panel." },
		{ name: "PopoverDescription", description: "Describes the panel." },
		{
			name: "PopoverClose",
			description: "Closes the popover.",
			props: [renderProp],
		},
	],
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A trigger and a titled panel.",
			Demo: PopoverUsage,
		},
		{
			id: "placement",
			title: "Placement",
			description: "Choose a side. The panel flips when there is no room.",
			Demo: PopoverPlacement,
		},
	],
	accessibility: [
		"The trigger carries `aria-expanded` and `aria-controls`. The panel has role `dialog`.",
		"Escape and an outside press close it, and focus returns to the trigger.",
		"Focus moves into the panel on open, so keyboard users can reach its controls.",
		"Scale transitions are off under reduced motion.",
	],
};
