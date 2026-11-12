import { InlineDisclosure } from "@passui/react/inline-disclosure";
import { defineDocs } from "../types";
import { InlineDisclosureDetails } from "./examples/inline-disclosure-details";
import { InlineDisclosureSettings } from "./examples/inline-disclosure-settings";
import { InlineDisclosureShowcase } from "./examples/inline-disclosure-showcase";
import { InlineDisclosureUsage } from "./examples/inline-disclosure-usage";

export const inlineDisclosureDocs = defineDocs<{
	open: boolean;
	children?: string;
}>()({
	slug: "inline-disclosure",
	name: "InlineDisclosure",
	importPath: "@passui/react/inline-disclosure",
	controls: {
		open: { kind: "boolean", default: true, required: true },
		children: {
			kind: "text",
			default: "Additional details",
		},
	},
	render: ({ open, children }) => (
		<InlineDisclosure open={open}>
			<p className="text-subheadline text-label-secondary p-4">{children}</p>
		</InlineDisclosure>
	),
	usage: InlineDisclosureUsage,
	showcase: InlineDisclosureShowcase,
	examples: [
		{
			id: "settings",
			component: InlineDisclosureSettings,
		},
		{ id: "details", component: InlineDisclosureDetails },
	],
});
