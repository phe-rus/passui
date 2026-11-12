import type { PropRow } from "../types";

export const renderProp: PropRow = {
	name: "render",
	type: "ReactElement | (props) => ReactElement",
	description:
		"Renders your own element in place of the default one. Props, handlers and refs are merged into it.",
};

export const openProps: PropRow[] = [
	{
		name: "open",
		type: "boolean",
		description: "Controlled open state. Pair with `onOpenChange`.",
	},
	{
		name: "defaultOpen",
		type: "boolean",
		default: "false",
		description: "Initial open state when uncontrolled.",
	},
	{
		name: "onOpenChange",
		type: "(details: { open: boolean }) => void",
		description: "Called when the overlay opens or closes.",
	},
];
