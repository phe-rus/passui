import { BadgeUsage } from "../examples/badge/usage";
import { BadgeWithIcon } from "../examples/badge/with-icon";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Variants",
			description: "Six tones from neutral to warning.",
			Demo: BadgeUsage,
		},
		{
			id: "with-icon",
			title: "With an icon",
			description: "SVG children are sized to the text.",
			Demo: BadgeWithIcon,
		},
	],
	accessibility: [
		"A badge is plain text. If colour carries the meaning, say it in the words too.",
	],
};
