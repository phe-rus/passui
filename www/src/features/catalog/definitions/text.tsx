import { TextElements } from "../examples/text/elements";
import { TextSizes } from "../examples/text/sizes";
import { TextTones } from "../examples/text/tones";
import { TextUsage } from "../examples/text/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A heading and a line under it, both from the type scale.",
			Demo: TextUsage,
		},
		{
			id: "sizes",
			title: "Sizes",
			description:
				"Apple's Dynamic Type styles, from `caption2` to `title`. They scale with the app's text size.",
			Demo: TextSizes,
		},
		{
			id: "tones",
			title: "Tones",
			description:
				"Roles, not colors: they follow the theme, light, dark and the chosen accent.",
			Demo: TextTones,
		},
		{
			id: "elements",
			title: "Elements",
			description:
				"`as` picks the element so a heading stays a heading; `truncate` keeps one line.",
			Demo: TextElements,
		},
	],
	accessibility: [
		"Pick the element with `as`, so headings keep their place in the outline; the size never changes the semantics.",
		"Tones keep AA contrast against the grounds they are meant for.",
	],
};
