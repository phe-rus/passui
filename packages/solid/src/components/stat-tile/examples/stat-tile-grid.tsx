import { StatTile } from "@passui/solid/stat-tile"

export function StatTileGrid() {
    return (
        <div class="grid w-full grid-cols-2 gap-3">
            <StatTile
                label="Visitors"
                value={12480}
                caption="This month"
            />
            <StatTile
                label="Signups"
                value={842}
                caption="Up 8%"
            />
        </div>
    )
}
