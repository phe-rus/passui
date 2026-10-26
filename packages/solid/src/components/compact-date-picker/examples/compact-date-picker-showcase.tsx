import { createSignal } from "solid-js"
import { CompactDatePicker } from "@passui/solid/compact-date-picker"

const labels = {
    previousMonth: "Previous month",
    nextMonth: "Next month",
    clear: "Remove date",
}

export function CompactDatePickerShowcase() {
    const [starts, setStarts] = createSignal("2026-10-15")
    const [ends, setEnds] = createSignal("")
    return (
        <div class="grid w-full max-w-sm grid-cols-2 gap-3">
            <CompactDatePicker
                label="Starts"
                labels={labels}
                locale="en-GB"
                value={starts()}
                onChange={(value) =>
                    value && setStarts(value)
                }
            />
            <CompactDatePicker
                label="Ends"
                placeholder="None"
                labels={labels}
                locale="en-GB"
                min={starts()}
                value={ends()}
                onChange={setEnds}
            />
        </div>
    )
}
