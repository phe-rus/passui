import { TabBarLabelsOnly } from "../examples/tab-bar/labels-only";
import { TabBarMinimized } from "../examples/tab-bar/minimized";
import { TabBarTwoTabs } from "../examples/tab-bar/two-tabs";
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
		{
			id: "two-tabs",
			title: "Three destinations",
			description: "Fewer tabs give each one more room.",
			Demo: TabBarTwoTabs,
		},
		{
			id: "labels-only",
			title: "Icon only",
			description: "Labels stay for assistive technology even when hidden.",
			Demo: TabBarLabelsOnly,
		},
	],
	accessibility: [
		"Each item keeps its label as an `aria-label`, so it is named even when minimized.",
		'The current destination has `aria-current="page"`.',
		"Use a `nav` landmark per bar and give it an `aria-label` when a page has more than one.",
	],
};
