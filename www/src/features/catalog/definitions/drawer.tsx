import { DrawerSnapPoints } from "../examples/drawer/snap-points";
import { DrawerUsage } from "../examples/drawer/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Drag the handle down, or press Escape, to dismiss.",
			Demo: DrawerUsage,
		},
		{
			id: "snap-points",
			title: "Snap points",
			description: "Rest at 40% height and drag up to open fully.",
			Demo: DrawerSnapPoints,
		},
	],
	accessibility: [
		"A modal dialog: focus is trapped, Escape closes it, and focus returns to the trigger.",
		"Swiping is an extra, never the only way. The close part and Escape always work.",
		"Put `data-passui-page` on your app root to scale the page back behind it. It is off under reduced motion.",
		"Nested drawers stack, and only the top layer closes on Escape.",
	],
};
