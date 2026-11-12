import { Button } from "@passui/react/button";
import {
	Popover,
	type PopoverContentProps,
	type PopoverOrigin,
} from "@passui/react/popover";
import { defineDocs } from "../types";
import { PopoverHelp } from "./examples/popover-help";
import { PopoverMenu } from "./examples/popover-menu";
import { PopoverShowcase } from "./examples/popover-showcase";
import { PopoverUsage } from "./examples/popover-usage";

type DemoProps = { origin: PopoverOrigin };

function PopoverDemo({ origin }: DemoProps) {
	return (
		<Popover>
			<Popover.Trigger>
				<Button variant="secondary">Open popover</Button>
			</Popover.Trigger>
			<Popover.Content origin={origin} className="w-60 p-4">
				<p className="text-callout text-label">
					Grows from its {origin} corner. Escape or a click outside closes it.
				</p>
			</Popover.Content>
		</Popover>
	);
}

export const popoverDocs = defineDocs<PopoverContentProps>()({
	slug: "popover",
	name: "Popover",
	importPath: "@passui/react/popover",
	controls: {
		origin: {
			kind: "select",
			options: { "top-left": true, "top-right": true },
			default: "top-left",
		},
	},
	render: (values) => <PopoverDemo {...values} />,
	childrenSnippet: ({ origin }) => ({
		imports: ['import { Button } from "@passui/react/button"'],
		setup: [],
		element: "Popover.Content",
		wrapper: {
			before:
				'<Popover><Popover.Trigger><Button variant="secondary">Open popover</Button></Popover.Trigger>',
			after: "</Popover>",
		},
		// `origin` is a control; don't let the generator also emit it from `changed`.
		omit: ["origin"],
		extraProps: {
			origin,
			className: "w-60 p-4",
		},
		children: "\n    <p>Escape or a click outside closes this popover.</p>\n",
	}),
	usage: PopoverUsage,
	showcase: PopoverShowcase,
	examples: [
		{ id: "menu", component: PopoverMenu },
		{ id: "help", component: PopoverHelp },
	],
	previewHeight: 320,
});
