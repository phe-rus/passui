import { DialogForm } from "../examples/dialog-form";
import { DialogUsage } from "../examples/dialog-usage";
import type { UiDoc } from "../types";
import { openProps, renderProp } from "./_shared";

export const doc: UiDoc = {
	slug: "dialog",
	name: "Dialog",
	group: "Presentation",
	icon: "alert",
	summary:
		"A focused question or short form over the page, on the Zag dialog machine, with enter and exit transitions that reverse mid flight.",
	entry: "@passui/react/dialog",
	sizeKb: 21,
	parts: [
		{
			name: "Dialog",
			description:
				"Owns the open state. Renders no element, so parts can sit anywhere inside it.",
			props: [
				...openProps,
				{
					name: "modal",
					type: "boolean",
					default: "true",
					description:
						"Traps focus and blocks interaction with the page behind.",
				},
			],
		},
		{
			name: "DialogTrigger",
			description: "The button that opens it.",
			props: [renderProp],
		},
		{
			name: "DialogContent",
			description:
				"Backdrop, centred panel and focus trap. Mounts only while open or leaving.",
			props: [renderProp],
		},
		{ name: "DialogHeader", description: "Stacks the title and description." },
		{
			name: "DialogTitle",
			description: "Names the dialog for assistive technology.",
		},
		{ name: "DialogDescription", description: "Describes the dialog." },
		{
			name: "DialogFooter",
			description: "Right aligned actions on wide screens, stacked on phones.",
		},
		{
			name: "DialogClose",
			description: "Closes the dialog.",
			props: [renderProp],
		},
	],
	examples: [
		{
			id: "usage",
			title: "Usage",
			description:
				"Triggers and close parts become your own button through `render`.",
			Demo: DialogUsage,
		},
		{
			id: "form",
			title: "Controlled form",
			description:
				"Hold `open` yourself so the form can close the dialog when it saves.",
			Demo: DialogForm,
		},
	],
	accessibility: [
		"The panel has role `dialog` and is named by `DialogTitle` and described by `DialogDescription`.",
		"Focus moves in on open, stays inside while open, and returns to the trigger on close.",
		"Escape and an outside press close it. Scroll locks until the last layer closes.",
		"A focused input stays above the soft keyboard through `--visual-viewport-height`.",
		"Slides become fades under reduced motion.",
	],
};
