import { TabBarFourAndOne } from "../examples/tab-bar/four-and-one";
import { TabBarLabelsOnly } from "../examples/tab-bar/labels-only";
import { TabBarMinimized } from "../examples/tab-bar/minimized";
import { TabBarScrollAware } from "../examples/tab-bar/scroll-aware";
import { TabBarSizes } from "../examples/tab-bar/sizes";
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
			id: "four-and-one",
			title: "Four and one",
			description:
				"`action` places a round glass button beside the capsule, the iOS 26 layout for search: destinations on one side, the one action that is not a destination on the other.",
			Demo: TabBarFourAndOne,
		},
		{
			id: "scroll-aware",
			title: "Scroll aware",
			description:
				"`autoMinimize` folds the bar to icons while you scroll down through content, and restores it on scroll up, at the top, or when you tap it.",
			Demo: TabBarScrollAware,
		},
		{
			id: "sizes",
			title: "Sizes",
			description:
				"`md` is the iOS proportion: a 24 pt symbol over an 11 pt label. `sm` and `lg` scale the symbol, the item and the padding.",
			Demo: TabBarSizes,
		},
		{
			id: "minimized",
			title: "Minimized",
			description:
				"Shrinks to icons only. Set `minimized` yourself, or use `autoMinimize` as above.",
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
		"The lens that marks it is decorative and moves with a spring; under reduced motion it jumps.",
		"Use a `nav` landmark per bar and give it an `aria-label` when a page has more than one.",
	],
};
