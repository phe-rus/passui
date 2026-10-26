/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { DatePicker } from "@passui/solid/date-picker"
export function DatePickerUsage() {
    const [value, setValue] = createSignal("2026-10-25")
    return (
        <DatePicker
            label="Birthday"
            locale="en-GB"
            value={value()}
            onChange={setValue}
            labels={{
                day: "Day",
                month: "Month",
                year: "Year",
                invalid: "Enter a valid date",
            }}
        />
    )
}
