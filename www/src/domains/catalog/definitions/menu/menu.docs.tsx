import { Menu } from "@passui/react/menu";
import { toast } from "@passui/react/toast";
import { defineDocs } from "../types";
import { MenuUsage } from "./examples/menu-usage";
import { MenuShowcase } from "./examples/menu-showcase";
import { MenuActions } from "./examples/menu-actions";
import { MenuChoices } from "./examples/menu-choices";

type DemoProps = {
	label: string;
	disabled: boolean;
	above: boolean;
	edge: "leading" | "trailing";
};

export const menuDocs = defineDocs<DemoProps>()({
	slug: "menu",
	name: "Menu",
	importPath: "@passui/react/menu",
	controls: {
		label: { kind: "text", default: "More actions", required: true },
		disabled: { kind: "boolean", default: false },
		above: { kind: "boolean", default: false },
		edge: {
			kind: "select",
			options: { leading: true, trailing: true },
			default: "leading",
		},
	},
	render: (props) => (
		<Menu
			{...props}
			items={[
				{ label: "Refresh", onSelect: () => toast("Refreshed") },
				{ label: "Share", onSelect: () => toast("Shared") },
			]}
		>
			More
		</Menu>
	),
	childrenSnippet: () => ({
		imports: ['import { toast } from "@passui/react/toast"'],
		children: "More",
		expressionProps: {
			items: '[{ label: "Refresh", onSelect: () => toast("Refreshed") }]',
		},
	}),
	usage: MenuUsage,
	showcase: MenuShowcase,
	examples: [
		{ id: "actions", component: MenuActions },
		{ id: "choices", component: MenuChoices, playground: { edge: "trailing" } },
	],
	previewHeight: 320,
});
