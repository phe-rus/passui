import { DatePickerLocales } from "../examples/date-picker/locales";
import { DatePickerPastOnly } from "../examples/date-picker/past-only";
import { DatePickerShowcase } from "../examples/date-picker/showcase";
import { DatePickerUsage } from "../examples/date-picker/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "locales",
			title: "Field order by locale",
			description:
				"The same date in three locales. Each one puts day, month and year where people expect them.",
			Demo: DatePickerLocales,
		},
		{
			id: "past-only",
			title: "Dates in the past only",
			description:
				"With max set to today, a future date shows the invalid message and saves nothing.",
			Demo: DatePickerPastOnly,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: DatePickerShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: DatePickerUsage },
	],
	accessibility: [
		"Pass the person's own locale, so the fields come in the order they write dates.",
		"Set max for birthdays, so a future date can't be saved.",
	],
};
