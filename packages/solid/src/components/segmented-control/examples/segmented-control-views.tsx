import { createSignal } from "solid-js"
import { SegmentedControl } from "@passui/solid/segmented-control"

const counts = { day: 4, week: 23, month: 96 }

export function SegmentedControlViews() {
    const [range, setRange] =
        createSignal<keyof typeof counts>("week")
    return (
        <div class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <SegmentedControl
                label="Range"
                value={range()}
                onChange={(value) =>
                    setRange(value as keyof typeof counts)
                }
                options={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                ]}
            />
            <div class="flex flex-col items-center gap-1 py-2">
                <span class="text-large-title font-bold text-label tabular-nums">
                    {counts[range()]}
                </span>
                <span class="text-footnote text-label-secondary">
                    sign-ins this {range()}
                </span>
            </div>
        </div>
    )
}
