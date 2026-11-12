import { AlertDialogConfirm } from "../examples/alert-dialog/confirm";
import { AlertDialogUsage } from "../examples/alert-dialog/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
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
