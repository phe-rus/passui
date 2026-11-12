import { AccordionMultiple } from "../examples/accordion/multiple";
import { AccordionUsage } from "../examples/accordion/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"One section open at a time; click the open one to close it.",
			Demo: AccordionUsage,
		},
		{
			id: "multiple",
			title: "Several open",
			description: "`multiple` lets any number of sections stay open.",
			Demo: AccordionMultiple,
		},
	],
	accessibility: [
		"Each trigger is a button inside a heading, with `aria-expanded` and `aria-controls`.",
		"Arrow keys, Home and End move between triggers.",
		'Open and closed regions use `role="region"` named by their trigger.',
	],
};
