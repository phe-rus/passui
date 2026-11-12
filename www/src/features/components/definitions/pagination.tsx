import { PaginationButtons } from "../examples/pagination/buttons";
import { PaginationUsage } from "../examples/pagination/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Links, with the current page marked.",
			Demo: PaginationUsage,
		},
		{
			id: "buttons",
			title: "Buttons",
			description:
				"`render` turns a link into a button for client-side paging.",
			Demo: PaginationButtons,
		},
	],
	accessibility: [
		'A `nav` landmark named Pagination. The current link has `aria-current="page"`.',
	],
};
