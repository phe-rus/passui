import { type DateRange, DateTimePicker } from "@passui/react/date-time-picker";
import { useState } from "react";

const labels = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	hour: "Hour",
	minute: "Minute",
	period: "AM or PM",
};

export function DateTimePickerRange() {
	const [range, setRange] = useState<DateRange>({ from: "", to: "" });
	return (
		<DateTimePicker
			mode="range"
			label="Stay"
			placeholder="Check in – check out"
			locale="en-US"
			labels={labels}
			value={range}
			onValueChange={setRange}
		/>
	);
}
