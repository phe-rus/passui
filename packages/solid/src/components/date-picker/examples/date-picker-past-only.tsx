import { createSignal } from "solid-js"
import { DatePicker } from "@passui/solid/date-picker"

export function DatePickerPastOnly() {
    const [date, setDate] = createSignal("")
    return (
        <div class="w-full max-w-sm">
            <DatePicker
                label="Date of birth"
                locale="en-GB"
                value={date()}
                onChange={setDate}
                max="2026-10-26"
                labels={{
                    day: "Day",
                    month: "Month",
                    year: "Year",
                    invalid: "Enter a valid date",
                }}
            />
        </div>
    )
}
