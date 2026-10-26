import { createSignal, For } from "solid-js"
import { SegmentedControl } from "@passui/solid/segmented-control"

const ranges = {
    day: {
        label: "Today",
        steps: "8,204",
        bars: [3, 5, 2, 6, 4, 7, 5],
    },
    week: {
        label: "This week",
        steps: "54,910",
        bars: [6, 4, 7, 5, 8, 6, 9],
    },
    month: {
        label: "This month",
        steps: "231,447",
        bars: [5, 7, 6, 8, 7, 9, 8],
    },
} as const
type Range = keyof typeof ranges

export function SegmentedControlShowcase() {
    const [range, setRange] = createSignal<Range>("week")
    const data = () => ranges[range()]
    return (
        <section class="flex w-full max-w-sm flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
            <SegmentedControl
                label="Range"
                value={range()}
                onChange={(value) => setRange(value as Range)}
                options={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                ]}
            />
            <div class="flex flex-col">
                <span class="text-footnote text-label-secondary">
                    {data().label}
                </span>
                <span class="text-title font-bold tabular-nums text-label">
                    {data().steps} steps
                </span>
            </div>
            <div class="flex h-28 items-end gap-2">
                <For each={data().bars}>
                    {(bar) => (
                        <span
                            class="flex-1 rounded-t-lg bg-accent transition-[height] duration-500"
                            style={{ height: `${bar * 10}%` }}
                        />
                    )}
                </For>
            </div>
        </section>
    )
}
