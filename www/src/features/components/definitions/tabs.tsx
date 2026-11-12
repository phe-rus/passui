import { TabsControlled } from "../examples/tabs/controlled";
import { TabsUsage } from "../examples/tabs/usage";
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
	],
	accessibility: [
		"`tablist`, `tab` and `tabpanel` roles with `aria-selected` and `aria-controls`.",
		"Arrow keys move focus, Home and End jump, and the active tab is the only tab stop.",
	],
};
