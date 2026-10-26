import { createSignal } from "solid-js"
import { CompactDatePicker } from "@passui/solid/compact-date-picker"
export function CompactDatePickerUsage() {
    const [value, setValue] = createSignal("2026-10-25")
    return (
        <CompactDatePicker
            label="Date"
            locale="en-GB"
            value={value()}
            onChange={setValue}
            labels={{
                previousMonth: "Previous month",
                nextMonth: "Next month",
                clear: "Clear",
            }}
        />
    )
}
