import { AspectRatioPortrait } from "../examples/aspect-ratio/portrait";
import { AspectRatioShowcase } from "../examples/aspect-ratio/showcase";
import { AspectRatioSquare } from "../examples/aspect-ratio/square";
import { AspectRatioUsage } from "../examples/aspect-ratio/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "portrait",
			title: "Portrait",
			description: "A 3:4 frame.",
			Demo: AspectRatioPortrait,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: AspectRatioShowcase,
		},
		{
			id: "square",
			title: "Square",
			description: "A 1:1 frame.",
			Demo: AspectRatioSquare,
		},
		{ id: "usage", title: "Usage", description: "", Demo: AspectRatioUsage },
	],
	accessibility: [
		"Provide meaningful image alt text and keep decorative media's alt empty.",
	],
};
