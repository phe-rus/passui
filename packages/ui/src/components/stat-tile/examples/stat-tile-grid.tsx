import { StatTile } from "@passui/react/stat-tile"

export function StatTileGrid() {
    return (
        <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="People" value={1284} />
            <StatTile
                label="Signed in now"
                value={86}
                caption="Across 3 apps"
            />
            <StatTile label="New today" value={12} />
            <StatTile
                label="Failed sign-ins"
                value={3}
                caption="In the last hour"
                tone="critical"
            />
        </div>
    )
}
