import type { wakeSliderDocs } from "..";
import type { ComponentContent } from "../../types";
export const wakeSliderContent: ComponentContent<typeof wakeSliderDocs> = {
	summary:
		"A compact seeker whose marks briefly rise along the path of a fast drag.",
	usage:
		"Use a controlled value and onChange for application state, or defaultValue for an independent control. Values run from 0 to 100. Motion stops at rest and follows Reduce Motion.",
	propDescriptions: {
		label: "Localized accessible name.",
		bars: "Adjusts the bars of the native control.",
		wake: "Adjusts the wake of the native control.",
	},
	examples: {
		quiet: {
			title: "Quiet",
			description:
				"Use the same native control with a different interaction setting.",
		},
		disabled: {
			title: "Disabled",
			description: "An unavailable state that keeps its label and value.",
		},
	},
	anatomy: [
		{
			element: "Track and motion",
			description:
				"A compact seeker whose marks briefly rise along the path of a fast drag.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Give the control a localized label and meaningful formatValue for units such as time.",
		},
	],
	accessibility: [
		"Arrow keys adjust the value; Shift makes larger steps. Home and End reach the bounds. Reduced motion removes the liquid or wake effect.",
	],
};
