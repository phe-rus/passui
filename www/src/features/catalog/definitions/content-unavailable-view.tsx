import { ContentUnavailableViewEmpty } from "../examples/content-unavailable-view/empty";
import { ContentUnavailableViewSearch } from "../examples/content-unavailable-view/search";
import { ContentUnavailableViewShowcase } from "../examples/content-unavailable-view/showcase";
import { ContentUnavailableViewUsage } from "../examples/content-unavailable-view/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "empty",
			title: "An empty collection",
			description: "Explain what will appear when content is added.",
			Demo: ContentUnavailableViewEmpty,
		},
		{
			id: "search",
			title: "Search results",
			description: "Describe the search state without announcing a failure.",
			Demo: ContentUnavailableViewSearch,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: ContentUnavailableViewShowcase,
		},
		{
			id: "usage",
			title: "Usage",
			description: "",
			Demo: ContentUnavailableViewUsage,
		},
	],
	accessibility: [
		"Use concise, localized labels that describe the current context.",
	],
};
