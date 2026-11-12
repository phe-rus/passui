import { Calendar } from "@passui/react/calendar";
import { useState } from "react";

export function DateTimePickerCalendar() {
	const [date, setDate] = useState("");
	return (
		<Calendar
			label="Event date"
			locale="en-US"
			labels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
			value={date}
			onValueChange={setDate}
		/>
	);
}
