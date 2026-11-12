import { CardStatFilters } from "../examples/card/stat-filters";
import { CardStatGrid } from "../examples/card/stat-grid";
import { CardUsage } from "../examples/card/usage";
import { CardWithAction } from "../examples/card/with-action";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Header, content and footer are all optional.",
			Demo: CardUsage,
		},
		{
			id: "with-action",
			title: "With an action",
			description: "`CardAction` sits in the header's second column.",
			Demo: CardWithAction,
		},
		{
			id: "stat-grid",
			title: "Stat tiles",
			description:
				"A stat tile is a Card with a label and a figure. Lay them in a grid for a dashboard.",
			Demo: CardStatGrid,
		},
		{
			id: "stat-filters",
			title: "Stat tiles as filters",
			description:
				"Give a tile an `onClick` and it becomes a toggle that marks the filter in use.",
			Demo: CardStatFilters,
		},
	],
	accessibility: [
		"A card is a plain `div`. Use headings inside it that fit the page's outline.",
	],
};
