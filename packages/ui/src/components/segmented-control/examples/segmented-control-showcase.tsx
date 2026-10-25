import { SegmentedControl } from "@passui/react"
import { useState } from "react"

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
    const [range, setRange] = useState<Range>("week")
    const data = ranges[range]

    return (
        <section className="flex w-full max-w-sm flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
            <SegmentedControl
                label="Range"
                value={range}
                onChange={setRange}
                options={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                ]}
            />
            <div className="flex flex-col">
                <span className="text-footnote text-label-secondary">
                    {data.label}
                </span>
                <span className="text-title font-bold tabular-nums text-label">
                    {data.steps} steps
                </span>
            </div>
            <div className="flex h-28 items-end gap-2">
                {data.bars.map((bar, index) => (
                    <span
                        key={index}
                        className="flex-1 rounded-t-lg bg-accent transition-[height] duration-500"
                        style={{ height: `${bar * 10}%` }}
                    />
                ))}
            </div>
        </section>
    )
}
