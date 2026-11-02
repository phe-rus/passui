import { CompactDatePicker } from "@passui/react/compact-date-picker"
import { useState } from "react"

export function CompactDatePickerBounded() {
    const [date, setDate] = useState("2026-11-12")
    return (
        <div className="flex w-full max-w-xs flex-col gap-3">
            <CompactDatePicker
                label="Appointment"
                locale="en-GB"
                value={date}
                onChange={setDate}
                min="2026-11-01"
                max="2026-11-30"
                labels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
            />
            <p className="text-footnote text-label-secondary">Choose a day in November 2026.</p>
        </div>
    )
}
