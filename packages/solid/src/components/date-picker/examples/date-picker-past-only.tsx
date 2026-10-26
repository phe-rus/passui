import { createSignal } from "solid-js"
import { DatePicker } from "@passui/solid/date-picker"

export function DatePickerPastOnly() {
    const [birthday, setBirthday] = createSignal("2090-01-01")
    const today = new Date().toISOString().slice(0, 10)
    return (
        <div class="flex w-full max-w-xs flex-col gap-3">
            <DatePicker
                label="Birthday"
                locale="en-US"
                value={birthday()}
                onChange={setBirthday}
                max={today}
                labels={{
                    day: "Day",
                    month: "Month",
                    year: "Year",
                    invalid:
                        "Your birthday can't be in the future.",
                }}
            />
            <p class="text-footnote text-label-secondary">
                Saved value: {birthday() || "none yet"}
            </p>
        </div>
    )
}
