import { TooltipIconButton } from "../examples/tooltip/icon-button";
import { TooltipNeighbours } from "../examples/tooltip/neighbours";
import { TooltipShortcut } from "../examples/tooltip/shortcut";
import { TooltipUsage } from "../examples/tooltip/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
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
		{
			id: "icon-button",
			title: "On an icon button",
			description: "Tell people what an icon does.",
			Demo: TooltipIconButton,
		},
		{
			id: "shortcut",
			title: "With a shortcut",
			description: "Show the key beside the name.",
			Demo: TooltipShortcut,
		},
	],
	accessibility: [
		"The trigger is described by the tip through `aria-describedby`.",
		"Opens on hover and keyboard focus only, never on touch, so it cannot hide controls on phones.",
		"Escape closes it. It holds plain text, never links or buttons. Use a Popover for those.",
		"Fades and scales are off under reduced motion.",
	],
};
