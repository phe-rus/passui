import { TabsControlled } from "../examples/tabs/controlled";
import { TabsLine } from "../examples/tabs/line";
import { TabsPill } from "../examples/tabs/pill";
import { TabsSolid } from "../examples/tabs/solid";
import { TabsTones } from "../examples/tabs/tones";
import { TabsUsage } from "../examples/tabs/usage";
import { TabsVertical } from "../examples/tabs/vertical";
import { TabsVerticalSolid } from "../examples/tabs/vertical-solid";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Arrow keys move between triggers.",
			Demo: TabsUsage,
		},
		{
			id: "controlled",
			title: "Controlled",
			description: "Track the active tab with `value`.",
			Demo: TabsControlled,
		},
		{
			id: "line",
			title: "Line",
			description: "Quiet text over an underline that glides to the selection.",
			Demo: TabsLine,
		},
		{
			id: "solid",
			title: "Solid",
			description:
				"A filled track with a raised thumb, like a segmented control.",
			Demo: TabsSolid,
		},
		{
			id: "tones",
			title: "Tones",
			description:
				"`tone` colors the selection from the theme: neutral glass, the app's accent, or the primary ink.",
			Demo: TabsTones,
		},
		{
			id: "pill",
			title: "Pill",
			description: "Bare text with a soft accent chip behind the selection.",
			Demo: TabsPill,
		},
		{
			id: "vertical",
			title: "Vertical",
			description:
				'`orientation="vertical"` stacks the list beside the panels. Arrow Up and Down move between triggers.',
			Demo: TabsVertical,
		},
		{
			id: "vertical-solid",
			title: "Vertical solid",
			description: "Every variant runs in both orientations.",
			Demo: TabsVerticalSolid,
		},
	],
	accessibility: [
		"`tablist`, `tab` and `tabpanel` roles with `aria-selected` and `aria-controls`.",
		"Arrow keys move focus, Home and End jump, and the active tab is the only tab stop.",
	],
};
