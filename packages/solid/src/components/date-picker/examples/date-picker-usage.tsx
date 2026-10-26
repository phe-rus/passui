import { createSignal } from "solid-js"
import { DatePicker } from "@passui/solid/date-picker"
export function DatePickerUsage() {
    const [birthday, setBirthday] = createSignal("")
    return (
        <div class="w-full max-w-xs">
            <DatePicker
                label="Birthday"
                locale="en-US"
                value={birthday()}
                onChange={setBirthday}
                labels={{
                    day: "Day",
                    month: "Month",
                    year: "Year",
                    invalid: "Enter a real date.",
                }}
            />
        </div>
    )
}
