import { SwatchPicker } from "@passui/react";
import { accents } from "@passui/tokens";
import { useState } from "react";
import { defineDocs } from "../types";
import { SwatchPickerAccents } from "./examples/swatch-picker-accents";
import { SwatchPickerLabels } from "./examples/swatch-picker-labels";
import { SwatchPickerShowcase } from "./examples/swatch-picker-showcase";
import { SwatchPickerUsage } from "./examples/swatch-picker-usage";

type DemoProps = { label: string };

function SwatchPickerDemo({ label }: DemoProps) {
	const [accent, setAccent] = useState<string>("blush");
	return (
		<SwatchPicker
			label={label}
			value={accent}
			onChange={setAccent}
			options={Object.values(accents).map((option) => ({
				value: option.id,
				label: option.name,
				color: option.swatch,
				ink: option.light.accentText,
			}))}
		/>
	);
}

export const swatchPickerDocs = defineDocs<DemoProps>()({
	slug: "swatch-picker",
	name: "SwatchPicker",
	importPath: "@passui/react",
	controls: {
		label: {
			kind: "text",
			default: "Accent colour",
			required: true,
		},
	},
	render: (values) => <SwatchPickerDemo {...values} />,
	childrenSnippet: () => ({
		imports: [
			'import { useState } from "react"',
			'import { accents } from "@passui/tokens"',
		],
		setup: ['const [colour, setColour] = useState("blush")'],
		children: "",
		expressionProps: {
			value: "colour",
			onChange: "setColour",
			options:
				"Object.values(accents).map((accent) => ({ value: accent.id, label: accent.name, color: accent.swatch, ink: accent.light.accentText }))",
		},
	}),
	usage: SwatchPickerUsage,
	showcase: SwatchPickerShowcase,
	examples: [
		{ id: "accents", component: SwatchPickerAccents },
		{ id: "labels", component: SwatchPickerLabels },
	],
});
