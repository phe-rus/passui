import { createSignal } from "solid-js"
import { CompactTimePicker } from "@passui/solid/compact-time-picker"
export function CompactTimePickerUsage() {
    const [value, setValue] = createSignal("09:30")
    return (
        <CompactTimePicker
            label="Time"
            locale="en-GB"
            value={value()}
            onChange={setValue}
            labels={{
                hour: "Hour",
                minute: "Minute",
                period: "Period",
            }}
        />
    )
}
