import { createSignal } from "solid-js"
import { CompactTimePicker } from "@passui/solid/compact-time-picker"
export function CompactTimePickerUsage() {
    const [time, setTime] = createSignal("18:30")
    return (
        <div class="w-full max-w-xs">
            <CompactTimePicker
                label="Time"
                locale="en-US"
                value={time()}
                onChange={setTime}
                labels={{
                    hour: "Hour",
                    minute: "Minute",
                    period: "AM or PM",
                }}
            />
        </div>
    )
}
