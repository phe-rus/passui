import type { WakeSliderProps } from "@passui/react/wake-slider";
import { WakeSlider } from "@passui/react/wake-slider";
import { useState } from "react";
import { defineDocs } from "../types";
import { WakeSliderDisabled } from "./examples/wake-slider-disabled";
import { WakeSliderQuiet } from "./examples/wake-slider-quiet";
import { WakeSliderShowcase } from "./examples/wake-slider-showcase";
import { WakeSliderUsage } from "./examples/wake-slider-usage";

function Demo(props: Pick<WakeSliderProps, "label" | "bars" | "wake">) {
	const [value, setValue] = useState(50);
	return (
		<div className="w-full max-w-xs">
			<WakeSlider {...props} value={value} onChange={setValue} />
		</div>
	);
}
export const wakeSliderDocs = defineDocs<
	Pick<WakeSliderProps, "label" | "bars" | "wake">
>()({
	slug: "wake-slider",
	name: "WakeSlider",
	importPath: "@passui/react/wake-slider",
	controls: {
		label: { kind: "text", default: "Playback position", required: true },
		bars: { kind: "number", default: 36, min: 12, max: 64, step: 1 },
		wake: { kind: "number", default: 60, min: 0, max: 100, step: 1 },
	},
	render: (props) => <Demo {...props} />,
	childrenSnippet: () => ({
		imports: ['import { useState } from "react"'],
		setup: ["const [value, setValue] = useState(50)"],
		expressionProps: { value: "value", onChange: "setValue" },
		children: "",
	}),
	usage: WakeSliderUsage,
	showcase: WakeSliderShowcase,
	examples: [
		{ id: "quiet", component: WakeSliderQuiet },
		{ id: "disabled", component: WakeSliderDisabled },
	],
});
