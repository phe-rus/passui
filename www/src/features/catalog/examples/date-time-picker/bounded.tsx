import { DateTimePicker } from "@passui/react/date-time-picker";
import { useState } from "react";

const labels = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	hour: "Hour",
	minute: "Minute",
	period: "AM or PM",
};

export function DateTimePickerBounded() {
	const [date, setDate] = useState("");
	return (
		<DateTimePicker
			label="Appointment"
			placeholder="Pick a day in 2026"
			locale="en-US"
			min="2026-01-01"
			max="2026-12-31"
			labels={labels}
			value={date}
			onValueChange={setDate}
		/>
	);
}
