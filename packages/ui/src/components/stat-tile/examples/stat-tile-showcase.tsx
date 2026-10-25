import { StatTile } from "@passui/react/stat-tile"
import { useState } from "react"

const tiles = [
    {
        id: "people",
        label: "People",
        value: 1284,
        caption: "32 joined this week",
    },
    {
        id: "sessions",
        label: "Signed in now",
        value: 86,
        caption: "Across 41 devices",
    },
    {
        id: "apps",
        label: "Apps",
        value: 12,
        caption: "3 updated today",
    },
    {
        id: "failures",
        label: "Failed sign ins",
        value: 3,
        caption: "In the last hour",
        critical: true,
    },
]

export function StatTileShowcase() {
    const [active, setActive] = useState("people")

    return (
        <div className="grid w-full max-w-lg grid-cols-2 gap-3">
            {tiles.map((tile) => (
                <StatTile
                    key={tile.id}
                    label={tile.label}
                    value={tile.value}
                    caption={tile.caption}
                    tone={
                        tile.critical ? "critical" : undefined
                    }
                    active={active === tile.id}
                    onClick={() => setActive(tile.id)}
                />
            ))}
        </div>
    )
}
