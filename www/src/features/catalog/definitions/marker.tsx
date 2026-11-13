import { MarkerDividers } from "../examples/marker/dividers";
import { MarkerRow } from "../examples/marker/row";
import { MarkerStatuses } from "../examples/marker/statuses";
import { MarkerUsage } from "../examples/marker/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Divider, note and status",
			description:
				"A labelled separator between days, a centred system note, and an inline status with a dot.",
			Demo: MarkerUsage,
		},
		{
			id: "row",
			title: "Row with action",
			description: "A bordered row that can carry one trailing action.",
			Demo: MarkerRow,
		},
		{
			id: "statuses",
			title: "Statuses",
			description: "Dots that say who is around.",
			Demo: MarkerStatuses,
		},
		{
			id: "dividers",
			title: "Dividers in a thread",
			description: "Day lines between groups of messages.",
			Demo: MarkerDividers,
		},
	],
	accessibility: [
		"Markers are plain text. Put important changes in a live region yourself, or announce them with a toast.",
		"Give a status dot its meaning in the text, never by colour alone.",
	],
};
