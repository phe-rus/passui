import type { SloshSliderProps } from "@passui/react/slosh-slider";
import { SloshSlider } from "@passui/react/slosh-slider";
import { useState } from "react";
import { defineDocs } from "../types";
import { SloshSliderDisabled } from "./examples/slosh-slider-disabled";
import { SloshSliderRigid } from "./examples/slosh-slider-rigid";
import { SloshSliderShowcase } from "./examples/slosh-slider-showcase";
import { SloshSliderUsage } from "./examples/slosh-slider-usage";

function Demo(
	props: Pick<SloshSliderProps, "label" | "viscosity" | "momentum" | "tilt">,
) {
	const [value, setValue] = useState(62);
	return (
		<div className="w-full max-w-xs">
			<SloshSlider {...props} value={value} onChange={setValue} />
		</div>
	);
}
export const sloshSliderDocs = defineDocs<
	Pick<SloshSliderProps, "label" | "viscosity" | "momentum" | "tilt">
>()({
	slug: "slosh-slider",
	name: "SloshSlider",
	importPath: "@passui/react/slosh-slider",
	controls: {
		label: { kind: "text", default: "Flow", required: true },
		viscosity: { kind: "number", default: 15, min: 0, max: 100, step: 1 },
		momentum: { kind: "number", default: 55, min: 0, max: 100, step: 1 },
		tilt: { kind: "number", default: 45, min: 0, max: 100, step: 1 },
	},
	render: (props) => <Demo {...props} />,
	childrenSnippet: () => ({
		imports: ['import { useState } from "react"'],
		setup: ["const [value, setValue] = useState(62)"],
		expressionProps: { value: "value", onChange: "setValue" },
		children: "",
	}),
	usage: SloshSliderUsage,
	showcase: SloshSliderShowcase,
	examples: [
		{ id: "rigid", component: SloshSliderRigid },
		{ id: "disabled", component: SloshSliderDisabled },
	],
});
