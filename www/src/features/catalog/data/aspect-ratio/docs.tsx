import { AspectRatio, type AspectRatioProps } from "@passui/react/aspect-ratio";
import { defineDocs } from "../types";
import { AspectRatioUsage } from "./examples/aspect-ratio-usage";
import { AspectRatioShowcase } from "./examples/aspect-ratio-showcase";
import { AspectRatioPortrait } from "./examples/aspect-ratio-portrait";
import { AspectRatioSquare } from "./examples/aspect-ratio-square";
export const aspectRatioDocs = defineDocs<Pick<AspectRatioProps, "ratio">>()({
	slug: "aspect-ratio",
	name: "AspectRatio",
	importPath: "@passui/react/aspect-ratio",
	controls: {
		ratio: {
			kind: "number",
			default: 1.3333333333333333,
			min: 0.25,
			max: 4,
			step: 0.25,
		},
	},
	render: (props) => (
		<AspectRatio {...props} className="bg-fill max-w-xs rounded-3xl">
			<div className="text-footnote text-label-secondary absolute inset-0 grid place-items-center">
				Crop frame
			</div>
		</AspectRatio>
	),
	usage: AspectRatioUsage,
	showcase: AspectRatioShowcase,
	examples: [
		{ id: "portrait", component: AspectRatioPortrait },
		{ id: "square", component: AspectRatioSquare },
	],
});
