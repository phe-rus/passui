import type { progressViewDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const progressViewContent: ComponentContent<typeof progressViewDocs> = {
	summary:
		"Show how much of an operation has completed, or that an operation is still in progress.",
	usage:
		"Use determinate progress when the amount of work is known; omit value when it cannot be measured.",
	propDescriptions: {
		label: "Accessible name displayed above the progress track.",
		size: "Thickness of the progress track.",
		detail: "Secondary context, such as the completed file count.",
	},
	examples: {
		uploading: {
			title: "Backup progress",
			description: "A measured task with a completion percentage.",
		},
		indeterminate: {
			title: "Connecting",
			description: "An operation without a known duration.",
		},
	},
	anatomy: [
		{ element: "Label", description: "Names the operation.", required: true },
		{
			element: "Track",
			description: "The total range or an indeterminate surface.",
			required: true,
		},
		{
			element: "Fill",
			description: "The completed fraction or ongoing activity.",
			required: true,
		},
	],
	practices: [
		{ kind: "do", text: "Show a real progress amount when it is available." },
		{
			kind: "dont",
			text: "Invent a completion percentage for an indeterminate process.",
		},
	],
	accessibility: [
		"Determinate progress reports the current and maximum values.",
		"Indeterminate progress leaves the numeric state unset and respects reduced motion.",
	],
};
