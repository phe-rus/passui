import { DateTimePicker } from "@passui/react/date-time-picker";
import { useState } from "react";

const labels = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	hour: "Hour",
	minute: "Minute",
	period: "AM or PM",
};

export function DateTimePickerDatetime() {
	const [value, setValue] = useState("");
	return (
		<DateTimePicker
			mode="datetime"
			label="Meeting"
			placeholder="Pick a date and time"
			locale="en-US"
			labels={labels}
			value={value}
			onValueChange={setValue}
		/>
	);
}
