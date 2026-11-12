import { AlertDialogConfirm } from "../examples/alert-dialog-confirm";
import { AlertDialogUsage } from "../examples/alert-dialog-usage";
import type { UiDoc } from "../types";
import { openProps, renderProp } from "./_shared";

export const doc: UiDoc = {
	slug: "alert-dialog",
	name: "Alert Dialog",
	group: "Presentation",
	icon: "alert",
	summary:
		"An interruption that needs an answer, such as confirming a deletion. An outside press does nothing and focus lands on Cancel.",
	entry: "@passui/react/alert-dialog",
	sizeKb: 21,
	parts: [
		{
			name: "AlertDialog",
			description:
				"Owns the open state on the Zag dialog machine with role `alertdialog`.",
			props: openProps,
		},
		{
			name: "AlertDialogTrigger",
			description: "Opens the dialog.",
			props: [renderProp],
		},
		{
			name: "AlertDialogContent",
			description: "Backdrop and panel. Mounts only while open or leaving.",
			props: [renderProp],
		},
		{
			name: "AlertDialogHeader",
			description: "Stacks the title and description.",
		},
		{ name: "AlertDialogTitle", description: "Names the dialog." },
		{
			name: "AlertDialogDescription",
			description: "Explains the consequence.",
		},
		{ name: "AlertDialogFooter", description: "Holds the two actions." },
		{
			name: "AlertDialogCancel",
			description:
				"Dismisses without acting. Receives initial focus, and Escape triggers it.",
			props: [renderProp],
		},
		{
			name: "AlertDialogAction",
			description: "Confirms and closes.",
			props: [renderProp],
		},
	],
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "A destructive confirmation with a trigger.",
			Demo: AlertDialogUsage,
		},
		{
			id: "confirm",
			title: "Confirm helper",
			description:
				"There is no imperative `confirm()`. Own the open state and run your work in the action.",
			Demo: AlertDialogConfirm,
		},
	],
	accessibility: [
		"Role `alertdialog`, named by the title and described by the description.",
		"An outside press is ignored, so the person must choose. Escape cancels.",
		"Initial focus lands on Cancel, the safe choice.",
		"Focus returns to the trigger on close.",
	],
};
