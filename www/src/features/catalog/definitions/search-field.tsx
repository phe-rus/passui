import { SearchFieldExpanding } from "../examples/search-field/expanding";
import { SearchFieldFilter } from "../examples/search-field/filter";
import { SearchFieldFloating } from "../examples/search-field/floating";
import { SearchFieldShowcase } from "../examples/search-field/showcase";
import { SearchFieldSizes } from "../examples/search-field/sizes";
import { SearchFieldToolbar } from "../examples/search-field/toolbar";
import { SearchFieldUsage } from "../examples/search-field/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "expanding",
			title: "One expanding search pill",
			description:
				"One box whose width is its state, not an icon swapping with an input. The lens stays put and the box grows around it; an empty field closes again on blur.",
			Demo: SearchFieldExpanding,
		},
		{
			id: "floating",
			title: "Floating",
			description:
				'`variant="floating"` is a glass pill that sits above content, with the same expanding behaviour.',
			Demo: SearchFieldFloating,
		},
		{
			id: "sizes",
			title: "Sizes",
			description:
				"The closed circle is exactly the control height at every size, with the lens centred in it.",
			Demo: SearchFieldSizes,
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
