import { BadgeCounts } from "../examples/badge/counts";
import { BadgeStatus } from "../examples/badge/status";
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
		{
			id: "counts",
			title: "Counts",
			description: "A badge beside a label, as in a list.",
			Demo: BadgeCounts,
		},
		{
			id: "status",
			title: "Status",
			description: "Colors carry meaning, so pair them with a word.",
			Demo: BadgeStatus,
		},
	],
	accessibility: [
		"A badge is plain text. If colour carries the meaning, say it in the words too.",
	],
};
