import { Divider, type DividerProps } from "@passui/react/divider";
import { defineDocs } from "../types";
import { DividerSections } from "./examples/divider-sections";
import { DividerShowcase } from "./examples/divider-showcase";
import { DividerUsage } from "./examples/divider-usage";
import { DividerVertical } from "./examples/divider-vertical";

export const dividerDocs = defineDocs<DividerProps>()({
	slug: "divider",
	name: "Divider",
	importPath: "@passui/react/divider",
	controls: {
		orientation: {
			kind: "select",
			options: { horizontal: true, vertical: true },
			default: "horizontal",
		},
		decorative: { kind: "boolean", default: true },
	},
	render: (values) => (
		<div className="flex min-h-20 items-center">
			<Divider {...values} />
		</div>
	),
	usage: DividerUsage,
	showcase: DividerShowcase,
	examples: [
		{ id: "sections", component: DividerSections },
		{
			id: "vertical",
			component: DividerVertical,
			playground: { orientation: "vertical" },
		},
	],
});
