import { StatTileFilters } from "../examples/stat-tile/filters";
import { StatTileGrid } from "../examples/stat-tile/grid";
import { StatTileShowcase } from "../examples/stat-tile/showcase";
import { StatTileUsage } from "../examples/stat-tile/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "filters",
			title: "Tiles as filters",
			description:
				"With onClick, a tile becomes a toggle: active marks the filter in use.",
			Demo: StatTileFilters,
		},
		{
			id: "grid",
			title: "A row of figures",
			description:
				"Tiles in a grid for a dashboard, one critical when its number needs attention.",
			Demo: StatTileGrid,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: StatTileShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: StatTileUsage },
	],
	accessibility: [
		"Keep labels short and the same length across a row.",
		"Use critical only for counts that should be zero.",
	],
};
