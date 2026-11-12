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
	],
	accessibility: [
		"A card is a plain `div`. Use headings inside it that fit the page's outline.",
	],
};
