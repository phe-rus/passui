import { createSignal, For } from "solid-js"
import { StatTile } from "@passui/solid/stat-tile"

const tiles = [
    {
        id: "people",
        label: "People",
        value: 1284,
        caption: "32 joined this week",
        critical: false,
    },
    {
        id: "sessions",
        label: "Signed in now",
        value: 86,
        caption: "Across 41 devices",
        critical: false,
    },
    {
        id: "apps",
        label: "Apps",
        value: 12,
        caption: "3 updated today",
        critical: false,
    },
    {
        id: "failures",
        label: "Failed sign ins",
        value: 3,
        caption: "In the last hour",
        critical: true,
    },
] as const

export function StatTileShowcase() {
    const [active, setActive] = createSignal("people")
    return (
        <div class="grid w-full max-w-lg grid-cols-2 gap-3">
            <For each={tiles}>
                {(tile) => (
                    <StatTile
                        label={tile.label}
                        value={tile.value}
                        caption={tile.caption}
                        tone={
                            tile.critical
                                ? "critical"
                                : undefined
                        }
                        active={active() === tile.id}
                        onClick={() => setActive(tile.id)}
                    />
                )}
            </For>
        </div>
    )
}
