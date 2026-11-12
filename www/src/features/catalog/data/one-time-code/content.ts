import type { oneTimeCodeDocs } from "..";
import type { ComponentContent } from "../../types";
export const oneTimeCodeContent: ComponentContent<typeof oneTimeCodeDocs> = {
	summary:
		"One native input drawn as code cells, with paste, autofill and verification feedback.",
	usage:
		"Keep verification in your application. Provide localized feedback and use onComplete to start a request; the component never validates secrets itself.",
	propDescriptions: {
		label: "Localized accessible name.",
		length: "Adjusts the length of the native control.",
		format:
			"Numeric by default; alphanumeric accepts uppercase letters and digits for device authorization. Pasted spaces and separators are removed.",
		status: "Adjusts the status of the native control.",
	},
	examples: {
		"device-code": {
			title: "Device authorization",
			description:
				"Eight letters and digits in one native field. Paste a formatted device code; review the requesting application before approving access.",
		},
		"four-digits": {
			title: "Four digits",
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
			element: "Input and decorative cells",
			description:
				"One native input drawn as code cells, with paste, autofill and verification feedback.",
			required: true,
		},
	],
	practices: [
		{
			kind: "do",
			text: "Keep code verification and timeouts in the application, and report errors with localized text.",
		},
	],
	accessibility: [
		"A single native input supports paste, one-time-code autofill and editing. Decorative cells are hidden from assistive technology.",
	],
};
