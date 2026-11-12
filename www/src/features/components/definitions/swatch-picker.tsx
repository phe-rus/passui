import { SwatchPickerAccents } from "../examples/swatch-picker/accents";
import { SwatchPickerLabels } from "../examples/swatch-picker/labels";
import { SwatchPickerShowcase } from "../examples/swatch-picker/showcase";
import { SwatchPickerUsage } from "../examples/swatch-picker/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "accents",
			title: "Every Passui accent",
			description:
				"The seven accents from Passui's tokens, with the chosen one previewed on a button.",
			Demo: SwatchPickerAccents,
		},
		{
			id: "labels",
			title: "Labels for tags",
			description:
				"Small sets of colors for labelling things, each swatch named for screen readers.",
			Demo: SwatchPickerLabels,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: SwatchPickerShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: SwatchPickerUsage },
	],
	accessibility: [
		"Name every colour, so it does not rely on colour vision.",
		"Preview the result next to the picker.",
	],
};
