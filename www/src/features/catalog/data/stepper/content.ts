import type { stepperDocs } from "@/features/catalog/data";
import type { ComponentContent } from "../../types";

export const stepperContent: ComponentContent<typeof stepperDocs> = {
	summary:
		"Increase or decrease a controlled numeric value in exact, bounded increments.",
	usage:
		"Use Stepper for counts, quantities and small numeric adjustments where exact values matter.",
	propDescriptions: {
		label: "Names the quantity being adjusted.",
		disabled: "Disables both actions without hiding the current value.",
	},
	examples: {
		quantity: {
			title: "Item quantity",
			description: "A whole-number selection within limits.",
		},
		fractions: {
			title: "Fractional increments",
			description: "Quarter-unit adjustments without decimal drift.",
		},
	},
	anatomy: [
		{
			element: "Label",
			description: "Describes the controlled quantity.",
			required: true,
		},
		{
			element: "Decrease and increase",
			description: "Buttons disable at their respective boundaries.",
			required: true,
		},
		{
			element: "Value",
			description: "Live output of the controlled number.",
			required: true,
		},
	],
	practices: [
		{ kind: "do", text: "Provide localized decrement and increment labels." },
		{
			kind: "dont",
			text: "Use an unbounded stepper for a long list of possible values.",
		},
	],
	accessibility: [
		"Each button has its own accessible action name.",
		"The current value is announced through a live output.",
	],
};
