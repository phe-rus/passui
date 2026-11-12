import { CompactDatePickerBounded } from "../examples/compact-date-picker/bounded";
import { CompactDatePickerOptional } from "../examples/compact-date-picker/optional";
import { CompactDatePickerShowcase } from "../examples/compact-date-picker/showcase";
import { CompactDatePickerUsage } from "../examples/compact-date-picker/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "bounded",
			title: "Date bounds",
			description:
				"Limit appointments to a date range; days outside it cannot be selected.",
			Demo: CompactDatePickerBounded,
		},
		{
			id: "optional",
			title: "Optional date",
			description:
				"Start empty and provide a clear action so reminders can be removed.",
			Demo: CompactDatePickerOptional,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: CompactDatePickerShowcase,
		},
		{
			id: "usage",
			title: "Usage",
			description: "",
			Demo: CompactDatePickerUsage,
		},
	],
	accessibility: [
		"Pass the person's own locale, so weeks start on the day they expect.",
		"Give labels.clear for optional dates, so a date can be removed again.",
	],
};
