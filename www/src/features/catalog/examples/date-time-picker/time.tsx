import { DateTimePicker } from "@passui/react/date-time-picker";
import { useState } from "react";

const labels = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	hour: "Hour",
	minute: "Minute",
	period: "AM or PM",
};

export function DateTimePickerTime() {
	const [time, setTime] = useState("09:30");
	return (
		<DateTimePicker
			mode="time"
			label="Reminder time"
			locale="en-US"
			minuteStep={15}
			labels={labels}
			value={time}
			onValueChange={setTime}
		/>
	);
}
