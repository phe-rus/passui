import { CollapsibleControlled } from "../examples/collapsible/controlled";
import { CollapsibleDefaultOpen } from "../examples/collapsible/default-open";
import { CollapsibleList } from "../examples/collapsible/list";
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
		{
			id: "controlled",
			title: "Controlled",
			description: "Own the open state to react to it.",
			Demo: CollapsibleControlled,
		},
		{
			id: "list",
			title: "A list that folds",
			description: "Show a few rows and fold away the rest.",
			Demo: CollapsibleList,
		},
	],
	accessibility: [
		"The trigger carries `aria-expanded` and `aria-controls` for its content.",
	],
};
