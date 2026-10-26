import { createSignal } from "solid-js"
import { SegmentedControl } from "@passui/solid/segmented-control"

export function SegmentedControlOverflow() {
    const [view, setView] = createSignal("today")
    return (
        <div class="w-full max-w-xs">
            <SegmentedControl
                label="Time range"
                value={view()}
                onChange={setView}
                options={[
                    { value: "today", label: "Today" },
                    { value: "week", label: "This week" },
                    { value: "month", label: "This month" },
                    { value: "year", label: "This year" },
                ]}
            />
        </div>
    )
}
