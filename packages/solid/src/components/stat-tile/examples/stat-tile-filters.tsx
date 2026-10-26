import { createSignal } from "solid-js"
import { StatTile } from "@passui/solid/stat-tile"
import { For } from "solid-js"

const filters = [
    { id: "all", label: "All requests", value: 42 },
    { id: "open", label: "Open", value: 7 },
    { id: "waiting", label: "Waiting on you", value: 2 },
]

export function StatTileFilters() {
    const [active, setActive] = createSignal("open")
    return (
        <div class="flex w-full max-w-xl flex-col gap-3">
            <div class="grid grid-cols-3 gap-3">
                <For each={filters}>
                    {(filter) => (
                        <StatTile
                            label={filter.label}
                            value={filter.value}
                            active={active() === filter.id}
                            onClick={() =>
                                setActive(filter.id)
                            }
                        />
                    )}
                </For>
            </div>
            <p class="text-center text-footnote text-label-secondary">
                Showing:{" "}
                {
                    filters.find(
                        (filter) => filter.id === active()
                    )?.label
                }
            </p>
        </div>
    )
}
