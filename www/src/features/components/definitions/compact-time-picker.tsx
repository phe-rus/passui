import { CompactTimePickerIntervals } from "../examples/compact-time-picker/intervals";
import { CompactTimePickerLocales } from "../examples/compact-time-picker/locales";
import { CompactTimePickerShowcase } from "../examples/compact-time-picker/showcase";
import { CompactTimePickerUsage } from "../examples/compact-time-picker/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "intervals",
			title: "Minute intervals",
			description:
				"Offer quarter-hour slots while preserving an existing exact time.",
			Demo: CompactTimePickerIntervals,
		},
		{
			id: "locales",
			title: "Local clocks",
			description:
				"The same time follows 12-hour, 24-hour and right-to-left locale conventions.",
			Demo: CompactTimePickerLocales,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: CompactTimePickerShowcase,
		},
		{
			id: "usage",
			title: "Usage",
			description: "",
			Demo: CompactTimePickerUsage,
		},
	],
	accessibility: [
		"Pass the person's own locale, so the clock matches their phone.",
		"Set minuteStep to what the task needs; an exact time already chosen stays on offer.",
	],
};
