import { InputOtpComplete } from "../examples/input-otp/complete";
import { InputOtpUsage } from "../examples/input-otp/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Usage",
			description: "Paste a code into any box and it fills them all.",
			Demo: InputOtpUsage,
		},
		{
			id: "complete",
			title: "On complete",
			description: "`onComplete` runs once every box is filled.",
			Demo: InputOtpComplete,
		},
	],
	accessibility: [
		'Each box is a native input, so autofill, paste and `autocomplete="one-time-code"` work.',
		"Backspace moves to the previous box; arrow keys move between boxes.",
	],
};
