import { useState } from "react";
import { LabeledContentValues } from "./examples/labeled-content-values";
import { LabeledContentWide } from "./examples/labeled-content-wide";
import { LabeledContentDescriptions } from "./examples/labeled-content-descriptions";
import { jsxAttribute } from "../snippet";
import { defineDocs } from "../types";
import { Toggle } from "@passui/react/toggle";
import { LabeledContentShowcase } from "./examples/labeled-content-showcase";
import { LabeledContentUsage } from "./examples/labeled-content-usage";
import { LabeledContent } from "@passui/react";

type DemoProps = {
	label: string;
	description?: string;
	stacked?: boolean;
	wide?: boolean;
};

function LabeledContentDemo(values: DemoProps) {
	const [on, setOn] = useState(true);
	return (
		<div className="border-separator/60 bg-elevated w-full max-w-sm rounded-3xl border">
			<LabeledContent {...values}>
				<Toggle
					label={values.label}
					labelHidden
					checked={on}
					onChange={setOn}
				/>
			</LabeledContent>
		</div>
	);
}

export const labeledContentDocs = defineDocs<DemoProps>()({
	slug: "labeled-content",
	name: "LabeledContent",
	importPath: "@passui/react",
	controls: {
		label: {
			kind: "text",
			default: "Show previews",
			required: true,
		},
		description: {
			kind: "text",
			default: "Shows the first lines of each note.",
		},
		stacked: { kind: "boolean", default: false },
		wide: { kind: "boolean", default: false },
	},
	render: (values) => <LabeledContentDemo {...values} />,
	childrenSnippet: ({ label }) => ({
		imports: [
			'import { useState } from "react"',
			'import { Toggle } from "@passui/react/toggle"',
		],
		setup: ["const [on, setOn] = useState(true)"],
		children: `<Toggle ${jsxAttribute("label", label)} labelHidden checked={on} onChange={setOn} />`,
	}),
	usage: LabeledContentUsage,
	showcase: LabeledContentShowcase,
	examples: [
		{
			id: "descriptions",
			component: LabeledContentDescriptions,
		},
		{
			id: "wide",
			component: LabeledContentWide,
			playground: { wide: true },
		},
		{ id: "values", component: LabeledContentValues },
	],
});
