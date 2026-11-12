import { ChartArea } from "../examples/chart/area";
import { ChartBar } from "../examples/chart/bar";
import { ChartFormatted } from "../examples/chart/formatted";
import { ChartMultiple } from "../examples/chart/multiple";
import { ChartUsage } from "../examples/chart/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Line",
			description:
				"The default type. The line draws on first paint and a tooltip follows the pointer.",
			Demo: ChartUsage,
		},
		{
			id: "area",
			title: "Area",
			description: "A line with its weight filled in.",
			Demo: ChartArea,
		},
		{
			id: "bar",
			title: "Bar",
			description: "Bars grow up from the baseline, one after another.",
			Demo: ChartBar,
		},
		{
			id: "multiple",
			title: "Multiple series",
			description:
				"Pass more series to compare them. A legend appears, and the tooltip lists each one.",
			Demo: ChartMultiple,
		},
		{
			id: "formatted",
			title: "Formatted values",
			description: "`format` shapes the axis and the tooltip.",
			Demo: ChartFormatted,
		},
	],
	accessibility: [
		"The chart is an image named by `label`, and a hidden table carries every number for screen readers.",
		"Never rely on colour alone: name each series and show values in the tooltip.",
		"Drawing and growing animations are off under reduced motion.",
	],
};
