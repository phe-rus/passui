import { TabBarMinimized } from "../examples/tab-bar/minimized";
import { TabBarUsage } from "../examples/tab-bar/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"A floating glass capsule of destinations. The active one is marked with `aria-current`.",
			Demo: TabBarUsage,
		},
		{
			id: "minimized",
			title: "Minimized",
			description:
				"Shrinks to icons only. Drive `minimized` from `useMinimizeOnScroll` to match iOS 26 while the page scrolls down.",
			Demo: TabBarMinimized,
		},
	],
	accessibility: [
		"Each item keeps its label as an `aria-label`, so it is named even when minimized.",
		'The current destination has `aria-current="page"`.',
		"Use a `nav` landmark per bar and give it an `aria-label` when a page has more than one.",
	],
};
