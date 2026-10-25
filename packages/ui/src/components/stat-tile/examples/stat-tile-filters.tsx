import { StatTile } from "@passui/react/stat-tile"
import { useState } from "react"

const filters = [
    { id: "all", label: "All requests", value: 42 },
    { id: "open", label: "Open", value: 7 },
    { id: "waiting", label: "Waiting on you", value: 2 },
]

export function StatTileFilters() {
    const [active, setActive] = useState("open")

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
            <div className="grid grid-cols-3 gap-3">
                {filters.map((filter) => (
                    <StatTile
                        key={filter.id}
                        label={filter.label}
                        value={filter.value}
                        active={active === filter.id}
                        onClick={() => setActive(filter.id)}
                    />
                ))}
            </div>
            <p className="text-center text-footnote text-label-secondary">
                Showing:{" "}
                {filters.find((f) => f.id === active)?.label}
            </p>
        </div>
    )
}
