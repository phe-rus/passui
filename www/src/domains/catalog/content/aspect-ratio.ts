import type { aspectRatioDocs } from "../definitions";
import type { ComponentContent } from "../types";
export const aspectRatioContent: ComponentContent<typeof aspectRatioDocs> = {
	summary: "A responsive crop frame that preserves the image's proportions.",
	usage:
		"Pass width divided by height as ratio. Images and videos cover the frame; resize its dimensions rather than scaling its contents. The showcase keeps equal area and a fixed stage across crop formats.",
	propDescriptions: {
		ratio: "Width divided by height; must be positive and finite.",
	},
	examples: {
		portrait: { title: "Portrait", description: "A 3:4 frame." },
		square: { title: "Square", description: "A 1:1 frame." },
	},
	anatomy: [
		{
			element: "Frame",
			description: "Sets aspect ratio and clips media without distortion.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Provide meaningful image alt text and keep decorative media's alt empty.",
		},
	],
	accessibility: [
		"The wrapper adds no role. Images retain their native alternative text.",
	],
};
