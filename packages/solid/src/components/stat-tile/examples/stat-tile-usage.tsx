import { StatTile } from "@passui/solid/stat-tile"

export function StatTileUsage() {
    return (
        <div class="w-56">
            <StatTile
                label="Active people"
                value={1284}
                caption="This week"
            />
        </div>
    )
}
