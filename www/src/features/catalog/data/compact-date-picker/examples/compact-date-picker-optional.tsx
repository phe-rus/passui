import { CompactDatePicker } from "@passui/react/compact-date-picker";
import { LabeledContent } from "@passui/react";
import { useState } from "react";

export function CompactDatePickerOptional() {
	const [date, setDate] = useState("");
	return (
		<LabeledContent
			label="Reminder"
			description="Optional; remove the date to turn it off."
		>
			<CompactDatePicker
				label="Reminder date"
				locale="en-US"
				value={date}
				onChange={setDate}
				placeholder="Not set"
				labels={{
					previousMonth: "Previous month",
					nextMonth: "Next month",
					clear: "Remove reminder",
				}}
			/>
		</LabeledContent>
	);
}
