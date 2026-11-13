import { SkeletonCard } from "../examples/skeleton/card";
import { SkeletonList } from "../examples/skeleton/list";
import { SkeletonText } from "../examples/skeleton/text";
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
		{
			id: "text",
			title: "Lines of text",
			description: "Widths vary so it reads like a paragraph.",
			Demo: SkeletonText,
		},
		{
			id: "list",
			title: "A list loading",
			description: "Repeat a row while data arrives.",
			Demo: SkeletonList,
		},
	],
	accessibility: [
		"Hidden from assistive technology. Announce loading state elsewhere, for example with `aria-busy` on the region.",
	],
};
