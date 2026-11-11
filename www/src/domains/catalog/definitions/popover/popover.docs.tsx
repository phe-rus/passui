import { PopoverHelp } from "./examples/popover-help";
import { useRef, useState } from "react";
import { Button } from "@passui/react/button";
import { defineDocs } from "../types";
import { useDismiss } from "@passui/react/use-dismiss";
import { PopoverMenu } from "./examples/popover-menu";
import { PopoverShowcase } from "./examples/popover-showcase";
import { PopoverUsage } from "./examples/popover-usage";
import { Popover, type PopoverProps } from "@passui/react/popover";

type DemoProps = Pick<PopoverProps, "origin">;

function PopoverDemo({ origin }: DemoProps) {
	const [open, setOpen] = useState(false);
	const anchor = useRef<HTMLDivElement>(null);
	const trigger = useRef<HTMLButtonElement>(null);
	useDismiss(anchor, open, () => setOpen(false));
	return (
		<div ref={anchor} className="relative">
			<Button
				ref={trigger}
				variant="secondary"
				aria-expanded={open}
				onClick={() => setOpen(!open)}
			>
				Open popover
			</Button>
			<Popover
				open={open}
				origin={origin}
				anchorRef={trigger}
				className={
					origin === "top-right"
						? "top-full right-0 mt-2 w-60 p-4"
						: "top-full left-0 mt-2 w-60 p-4"
				}
			>
				<p className="text-callout text-label">
					Grows from its {origin ?? "top-left"} corner. Escape or a click
					outside closes it.
				</p>
			</Popover>
		</div>
	);
}

export const popoverDocs = defineDocs<PopoverProps>()({
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
		imports: [
			'import { Button } from "@passui/react/button"',
			'import { useRef, useState } from "react"',
			'import { useDismiss } from "@passui/react/use-dismiss"',
		],
		setup: [
			"const [open, setOpen] = useState(false)",
			"const anchor = useRef<HTMLDivElement>(null)",
			"const trigger = useRef<HTMLButtonElement>(null)",
			"useDismiss(anchor, open, () => setOpen(false))",
		],
		wrapper: {
			before:
				'<div ref={anchor} className="relative"><Button ref={trigger} aria-expanded={open} onClick={() => setOpen(!open)}>Open popover</Button>',
			after: "</div>",
		},
		expressionProps: { open: "open", anchorRef: "trigger" },
		extraProps: {
			className:
				origin === "top-right"
					? "top-full right-0 mt-2 w-60 p-4"
					: "top-full left-0 mt-2 w-60 p-4",
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
