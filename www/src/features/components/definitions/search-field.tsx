import { SearchFieldExpanding } from "../examples/search-field/expanding";
import { SearchFieldFilter } from "../examples/search-field/filter";
import { SearchFieldShowcase } from "../examples/search-field/showcase";
import { SearchFieldToolbar } from "../examples/search-field/toolbar";
import { SearchFieldUsage } from "../examples/search-field/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "expanding",
			title: "One expanding search pill",
			description:
				"Focus the icon to reveal the field. An empty field returns to its compact shape on blur or Escape.",
			Demo: SearchFieldExpanding,
		},
		{
			id: "filter",
			title: "Filtering a list",
			description:
				"The field narrows the rows below as people type, with a message when nothing matches.",
			Demo: SearchFieldFilter,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: SearchFieldShowcase,
		},
		{
			id: "toolbar",
			title: "In a toolbar",
			description: "A narrow field beside other controls at the top of a list.",
			Demo: SearchFieldToolbar,
		},
		{ id: "usage", title: "Usage", description: "", Demo: SearchFieldUsage },
	],
	accessibility: [
		"Say what is searched in the placeholder.",
		"Show a friendly message when nothing matches.",
	],
};
