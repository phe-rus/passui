import type { sliderDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const sliderContent: ComponentContent<typeof sliderDocs> = {
	summary:
		"Adjust a number across a continuous range with native keyboard, pointer, and touch interactions.",
	usage:
		"Use a slider for approximate adjustments such as volume or brightness; use Stepper for exact counts.",
	propDescriptions: {
		label: "Accessible name displayed above the range.",
		disabled: "Prevents interaction while keeping the value visible.",
	},
	examples: {
		volume: {
			title: "Playback volume",
			description: "A five-point adjustment interval with a short hint.",
		},
		disabled: {
			title: "Managed value",
			description: "A visible value that cannot be changed.",
		},
	},
	anatomy: [
		{ element: "Label", description: "Names the range.", required: true },
		{
			element: "Track and thumb",
			description: "Native range input with a themed thumb.",
			required: true,
		},
	],
	practices: [
		{ kind: "do", text: "Use a bounded range with a meaningful step." },
		{
			kind: "dont",
			text: "Use a slider when the user must enter an exact quantity.",
		},
	],
	accessibility: [
		"The native input supports arrow keys and assistive technology.",
		"Use formatValue to announce localized values and units.",
	],
};
