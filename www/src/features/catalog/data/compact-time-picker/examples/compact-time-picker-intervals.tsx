import { CompactTimePicker } from "@passui/react/compact-time-picker";
import { useState } from "react";

export function CompactTimePickerIntervals() {
	const [time, setTime] = useState("09:17");
	return (
		<div className="flex w-full max-w-xs flex-col gap-3">
			<CompactTimePicker
				label="Appointment time"
				locale="en-GB"
				value={time}
				onChange={setTime}
				minuteStep={15}
				labels={{ hour: "Hour", minute: "Minute", period: "AM or PM" }}
			/>
			<p className="text-footnote text-label-secondary">
				Quarter-hour choices preserve the exact time already selected.
			</p>
		</div>
	);
}
