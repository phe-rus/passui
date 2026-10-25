import { StatTile } from "@passui/react/stat-tile"

export function StatTileUsage() {
    return (
        <div className="w-56">
            <StatTile
                label="Active people"
                value={1284}
                caption="This week"
            />
        </div>
    )
}
