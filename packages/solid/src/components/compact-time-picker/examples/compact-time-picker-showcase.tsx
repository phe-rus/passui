import { createSignal } from "solid-js"
import { CompactTimePicker } from "@passui/solid/compact-time-picker"

const labels = {
    hour: "Hour",
    minute: "Minute",
    period: "AM or PM",
}

export function CompactTimePickerShowcase() {
    const [starts, setStarts] = createSignal("09:00")
    const [ends, setEnds] = createSignal("10:30")
    return (
        <div class="grid w-full max-w-sm grid-cols-2 gap-3">
            <CompactTimePicker
                label="Starts"
                labels={labels}
                locale="en-US"
                value={starts()}
                onChange={setStarts}
            />
            <CompactTimePicker
                label="Ends"
                labels={labels}
                locale="en-GB"
                value={ends()}
                onChange={setEnds}
            />
        </div>
    )
}
