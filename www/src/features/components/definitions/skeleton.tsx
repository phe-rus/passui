import { SkeletonCard } from "../examples/skeleton/card";
import { SkeletonUsage } from "../examples/skeleton/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Size it with classes.",
			Demo: SkeletonUsage,
		},
		{
			id: "card",
			title: "Card",
			description: "Mirror the layout that will replace it.",
			Demo: SkeletonCard,
		},
	],
	accessibility: [
		"Hidden from assistive technology. Announce loading state elsewhere, for example with `aria-busy` on the region.",
	],
};
