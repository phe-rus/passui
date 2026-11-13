import { PaginationButtons } from "../examples/pagination/buttons";
import { PaginationRange } from "../examples/pagination/range";
import { PaginationSimple } from "../examples/pagination/simple";
import { PaginationSizesAndTones } from "../examples/pagination/sizes-and-tones";
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
		{
			id: "range",
			title: "Page range",
			description:
				'`pageRange(current, total)` returns the numbers to show with `"ellipsis"` where a run is folded. Pass `siblings` to widen it.',
			Demo: PaginationRange,
		},
		{
			id: "sizes-and-tones",
			title: "Sizes and tones",
			description:
				"`size` matches the other controls; `tone` colors the current page from the theme: neutral, accent or primary.",
			Demo: PaginationSizesAndTones,
		},
		{
			id: "simple",
			title: "Previous and next",
			description: "When the total is long or unknown, show only the arrows.",
			Demo: PaginationSimple,
		},
	],
	accessibility: [
		'A `nav` landmark named Pagination. The current link has `aria-current="page"`.',
	],
};
