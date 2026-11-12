import { DrawerSnapPoints } from "../examples/drawer-snap-points";
import { DrawerUsage } from "../examples/drawer-usage";
import type { UiDoc } from "../types";
import { openProps, renderProp } from "./_shared";

export const doc: UiDoc = {
	slug: "drawer",
	name: "Drawer",
	group: "Presentation",
	icon: "panel",
	summary:
		"A bottom sheet with a grab handle that you drag down to dismiss, on the Zag drawer machine. Resting heights come from snap points.",
	entry: "@passui/react/drawer",
	sizeKb: 29,
	parts: [
		{
			name: "Drawer",
			description: "Owns the open state, swipe and snap points.",
			props: [
				...openProps,
				{
					name: "snapPoints",
					type: "(number | string)[]",
					description:
						"Resting positions as fractions of height or CSS lengths.",
				},
				{
					name: "activeSnapPoint",
					type: "number | string | null",
					description: "Controlled snap point. Pair with `onSnapPointChange`.",
				},
				{
					name: "onSnapPointChange",
					type: "(details) => void",
					description: "Called when the drawer settles on a snap point.",
				},
			],
		},
		{
			name: "DrawerTrigger",
			description: "Opens the drawer.",
			props: [renderProp],
		},
		{
			name: "DrawerContent",
			description:
				"Backdrop and panel, as tall as its content. Scales a `data-passui-page` element behind it.",
			props: [renderProp],
		},
		{ name: "DrawerHandle", description: "The grab handle at the top edge." },
		{ name: "DrawerHeader", description: "Stacks the title and description." },
		{ name: "DrawerTitle", description: "Names the drawer." },
		{ name: "DrawerDescription", description: "Describes the drawer." },
		{ name: "DrawerFooter", description: "Holds the actions." },
		{
			name: "DrawerClose",
			description: "Closes the drawer.",
			props: [renderProp],
		},
	],
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Drag the handle down, or press Escape, to dismiss.",
			Demo: DrawerUsage,
		},
		{
			id: "snap-points",
			title: "Snap points",
			description: "Rest at 40% height and drag up to open fully.",
			Demo: DrawerSnapPoints,
		},
	],
	accessibility: [
		"A modal dialog: focus is trapped, Escape closes it, and focus returns to the trigger.",
		"Swiping is an extra, never the only way. The close part and Escape always work.",
		"Put `data-passui-page` on your app root to scale the page back behind it. It is off under reduced motion.",
		"Nested drawers stack, and only the top layer closes on Escape.",
	],
};
