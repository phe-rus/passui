import { AccordionDisabled } from "../examples/accordion/disabled";
import { AccordionFaq } from "../examples/accordion/faq";
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
		{
			id: "faq",
			title: "Frequently asked questions",
			description: "One item open at a time, the way a FAQ reads best.",
			Demo: AccordionFaq,
		},
		{
			id: "disabled",
			title: "Disabled item",
			description: "A disabled item stays in the list but cannot be opened.",
			Demo: AccordionDisabled,
		},
	],
	anatomy: {
		AccordionTrigger: "AccordionItem",
		AccordionContent: "AccordionItem",
	},
	accessibility: [
		"Each trigger is a button inside a heading, with `aria-expanded` and `aria-controls`.",
		"Arrow keys, Home and End move between triggers.",
		'Open and closed regions use `role="region"` named by their trigger.',
	],
};
