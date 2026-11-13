import { DateTimePickerBounded } from "../examples/date-time-picker/bounded";
import { DateTimePickerCalendar } from "../examples/date-time-picker/calendar";
import { DateTimePickerDatetime } from "../examples/date-time-picker/datetime";
import { DateTimePickerRange } from "../examples/date-time-picker/range";
import { DateTimePickerTime } from "../examples/date-time-picker/time";
import { DateTimePickerUsage } from "../examples/date-time-picker/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "usage",
			title: "Date",
			description:
				"The default mode. Choose the month title to open month and year wheels, so a far date is one flick. The value is a plain `YYYY-MM-DD` string.",
			Demo: DateTimePickerUsage,
		},
		{
			id: "time",
			title: "Time",
			description:
				"Hour, minute and period wheels that snap, on the clock the locale reads, 12 hour with AM and PM or 24 hour. The value is `HH:MM`.",
			Demo: DateTimePickerTime,
		},
		{
			id: "datetime",
			title: "Date and time",
			description:
				"Two chips side by side, one for the date and one for the time, each opening its own panel, as in iOS. The value is `YYYY-MM-DDTHH:MM`.",
			Demo: DateTimePickerDatetime,
		},
		{
			id: "range",
			title: "Range",
			description:
				"Choose a start and an end. The panel closes when the range is complete.",
			Demo: DateTimePickerRange,
		},
		{
			id: "bounded",
			title: "Bounds",
			description: "`min` and `max` disable the days outside them.",
			Demo: DateTimePickerBounded,
		},
		{
			id: "calendar",
			title: "Inline calendar",
			description:
				'`Calendar` is the same month grid without the button, for pages that show it all the time. It takes `mode="range"` too.',
			Demo: DateTimePickerCalendar,
		},
	],
	accessibility: [
		"Arrow keys move by day and week, Page Up and Page Down by month, Home and End to the week's edges.",
		"The week starts where the locale's does.",
		"The month title is a button that opens the month and year wheels. Each wheel is a listbox: arrow keys, Page Up and Page Down, Home and End move it, and the chosen row is marked.",
		"Pass every label as a prop so the picker can be translated.",
	],
};
