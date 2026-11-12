import { DisclosureGroup } from "@passui/react/disclosure-group";
import { useState } from "react";
import { defineDocs } from "../types";
import { DisclosureGroupDisabled } from "./examples/disclosure-group-disabled";
import { DisclosureGroupSettings } from "./examples/disclosure-group-settings";
import { DisclosureGroupShowcase } from "./examples/disclosure-group-showcase";
import { DisclosureGroupUsage } from "./examples/disclosure-group-usage";

type DemoProps = { label: string; disabled: boolean; description: string };

function DisclosureGroupDemo(props: DemoProps) {
	const [open, setOpen] = useState(false);
	return (
		<DisclosureGroup {...props} open={open} onOpenChange={setOpen}>
			<p className="text-footnote text-label-secondary">
				Additional settings appear here.
			</p>
		</DisclosureGroup>
	);
}

export const disclosureGroupDocs = defineDocs<DemoProps>()({
	slug: "disclosure-group",
	name: "DisclosureGroup",
	importPath: "@passui/react/disclosure-group",
	controls: {
		label: { kind: "text", default: "Advanced settings", required: true },
		description: { kind: "text", default: "Additional options" },
		disabled: { kind: "boolean", default: false },
	},
	render: (props) => <DisclosureGroupDemo {...props} />,
	childrenSnippet: () => ({
		imports: ['import { useState } from "react"'],
		setup: ["const [open, setOpen] = useState(false)"],
		expressionProps: { open: "open", onOpenChange: "setOpen" },
		children: "\n    <p>Additional settings appear here.</p>\n",
	}),
	usage: DisclosureGroupUsage,
	showcase: DisclosureGroupShowcase,
	examples: [
		{ id: "settings", component: DisclosureGroupSettings },
		{
			id: "disabled",
			component: DisclosureGroupDisabled,
			playground: { disabled: true },
		},
	],
});
