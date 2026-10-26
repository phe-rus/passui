/** @jsxImportSource solid-js */
import { StatTile } from "@passui/solid/stat-tile"

export function StatTileUsage() {
    return (
        <StatTile
            label="Active people"
            value={1284}
            caption="Up 12% this week"
        />
    )
}
