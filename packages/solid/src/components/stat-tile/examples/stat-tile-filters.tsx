import { createSignal } from "solid-js"
import { StatTile } from "@passui/solid/stat-tile"
import { SegmentedControl } from "@passui/solid/segmented-control"

export function StatTileFilters() {
    const [period, setPeriod] = createSignal("week")
    return (
        <div class="grid w-full max-w-sm gap-3">
            <SegmentedControl
                label="Period"
                value={period()}
                onChange={setPeriod}
                options={[
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                ]}
            />
            <StatTile
                label="New members"
                value={period() === "week" ? 128 : 512}
                caption={
                    period() === "week"
                        ? "Last 7 days"
                        : "Last 30 days"
                }
            />
        </div>
    )
}
