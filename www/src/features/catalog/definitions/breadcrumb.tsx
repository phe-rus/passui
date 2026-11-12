import { BreadcrumbCollapsed } from "../examples/breadcrumb/collapsed";
import { BreadcrumbCustomSeparator } from "../examples/breadcrumb/custom-separator";
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
		{
			id: "custom-separator",
			title: "Custom separator",
			description: "Pass any child to `BreadcrumbSeparator`, such as an icon.",
			Demo: BreadcrumbCustomSeparator,
		},
		{
			id: "collapsed",
			title: "Collapsed",
			description:
				"Fold the middle of a long path behind `BreadcrumbEllipsis` and a dropdown menu.",
			Demo: BreadcrumbCollapsed,
		},
	],
	accessibility: [
		"A `nav` landmark named Breadcrumb holding an ordered list.",
		'The current page carries `aria-current="page"`; separators are hidden.',
	],
};
