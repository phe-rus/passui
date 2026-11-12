import { BreadcrumbRouterLink } from "../examples/breadcrumb/router-link";
import { BreadcrumbUsage } from "../examples/breadcrumb/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "The last item is the current page.",
			Demo: BreadcrumbUsage,
		},
		{
			id: "router-link",
			title: "Your router's link",
			description: "`render` swaps the anchor for any element.",
			Demo: BreadcrumbRouterLink,
		},
	],
	accessibility: [
		"A `nav` landmark named Breadcrumb holding an ordered list.",
		'The current page carries `aria-current="page"`; separators are hidden.',
	],
};
