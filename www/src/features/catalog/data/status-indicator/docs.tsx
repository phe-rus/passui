import { StatusIndicator } from "@passui/react";
import { defineDocs } from "../types";
import { StatusIndicatorLive } from "./examples/status-indicator-live";
import { StatusIndicatorShowcase } from "./examples/status-indicator-showcase";
import { StatusIndicatorStates } from "./examples/status-indicator-states";
import { StatusIndicatorUsage } from "./examples/status-indicator-usage";

type DemoProps = {
	state: "saved" | "syncing" | "offline";
	children?: string;
};

export const statusIndicatorDocs = defineDocs<DemoProps>()({
	slug: "status-indicator",
	name: "StatusIndicator",
	importPath: "@passui/react",
	controls: {
		state: {
			kind: "select",
			options: {
				saved: true,
				syncing: true,
				offline: true,
			},
			default: "saved",
			required: true,
		},
		children: {
			kind: "text",
			default: "All changes saved",
		},
	},
	render: ({ children, ...values }) => (
		<StatusIndicator {...values}>{children}</StatusIndicator>
	),
	usage: StatusIndicatorUsage,
	showcase: StatusIndicatorShowcase,
	examples: [
		{ id: "states", component: StatusIndicatorStates },
		{ id: "live", component: StatusIndicatorLive },
	],
});
