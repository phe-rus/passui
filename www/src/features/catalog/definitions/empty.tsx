import { EmptyEmpty } from "../examples/empty/empty";
import { EmptySearch } from "../examples/empty/search";
import { EmptyShowcase } from "../examples/empty/showcase";
import { EmptyUsage } from "../examples/empty/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "empty",
			title: "An empty collection",
			description: "Explain what will appear when content is added.",
			Demo: EmptyEmpty,
		},
		{
			id: "search",
			title: "Search results",
			description: "Describe the search state without announcing a failure.",
			Demo: EmptySearch,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: EmptyShowcase,
		},
		{
			id: "usage",
			title: "Usage",
			description: "",
			Demo: EmptyUsage,
		},
	],
	accessibility: [
		"Use concise, localized labels that describe the current context.",
	],
};
