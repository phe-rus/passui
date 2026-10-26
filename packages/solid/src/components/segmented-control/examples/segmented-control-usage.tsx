import { createSignal } from "solid-js"
import { SegmentedControl } from "@passui/solid/segmented-control"

export function SegmentedControlUsage() {
    const [value, setValue] = createSignal("week")
    return (
        <div class="w-full max-w-sm">
            <SegmentedControl
                label="Period"
                value={value()}
                onChange={setValue}
                options={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                ]}
            />
        </div>
    )
}
