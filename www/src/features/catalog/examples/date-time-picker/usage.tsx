import { DateTimePicker } from "@passui/react/date-time-picker";
import { useState } from "react";

const labels = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	hour: "Hour",
	minute: "Minute",
	period: "AM or PM",
};

export function DateTimePickerUsage() {
	const [date, setDate] = useState("");
	return (
		<DateTimePicker
			label="Due date"
			placeholder="Pick a date"
			locale="en-US"
			labels={labels}
			value={date}
			onValueChange={setDate}
		/>
	);
}
