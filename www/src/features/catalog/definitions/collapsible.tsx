import { CollapsibleDefaultOpen } from "../examples/collapsible/default-open";
import { CollapsibleUsage } from "../examples/collapsible/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Any element can be the trigger through `render`.",
			Demo: CollapsibleUsage,
		},
		{
			id: "default-open",
			title: "Open at first",
			description: "`defaultOpen` starts it expanded.",
			Demo: CollapsibleDefaultOpen,
		},
	],
	accessibility: [
		"The trigger carries `aria-expanded` and `aria-controls` for its content.",
	],
};
