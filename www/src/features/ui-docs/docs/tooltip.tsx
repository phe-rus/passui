import { TooltipNeighbours } from "../examples/tooltip-neighbours";
import { TooltipUsage } from "../examples/tooltip-usage";
import type { UiDoc } from "../types";
import { renderProp } from "./_shared";

export const doc: UiDoc = {
	slug: "tooltip",
	name: "Tooltip",
	group: "Presentation",
	icon: "help",
	summary:
		"A short label on hover or keyboard focus, on the Zag tooltip machine. It never opens on touch and its neighbours skip the delay.",
	entry: "@passui/react/tooltip",
	sizeKb: 21,
	parts: [
		{
			name: "Tooltip",
			description: "Owns the open state and position.",
			props: [
				{
					name: "openDelay",
					type: "number",
					default: "400",
					description:
						"Milliseconds before it opens. Skipped when a neighbour just closed.",
				},
				{
					name: "closeDelay",
					type: "number",
					default: "150",
					description: "Milliseconds before it closes.",
				},
				{
					name: "placement",
					type: "Placement",
					default: '"top"',
					description: "Where the tip sits against its trigger.",
				},
				{
					name: "offset",
					type: "number",
					default: "6",
					description: "Gap between trigger and tip, in pixels.",
				},
				{
					name: "disabled",
					type: "boolean",
					description: "Never opens.",
				},
			],
		},
		{
			name: "TooltipTrigger",
			description: "The element described by the tip.",
			props: [renderProp],
		},
		{
			name: "TooltipContent",
			description: "The tip. Plain text only.",
			props: [renderProp],
		},
	],
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Hover or focus the button.",
			Demo: TooltipUsage,
		},
		{
			id: "neighbours",
			title: "Neighbours",
			description:
				"Move across the row. After the first tip, the rest open without the delay.",
			Demo: TooltipNeighbours,
		},
	],
	accessibility: [
		"The trigger is described by the tip through `aria-describedby`.",
		"Opens on hover and keyboard focus only, never on touch, so it cannot hide controls on phones.",
		"Escape closes it. It holds plain text, never links or buttons. Use a Popover for those.",
		"Fades and scales are off under reduced motion.",
	],
};
