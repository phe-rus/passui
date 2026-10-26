import { createSignal } from "solid-js"
import { SearchField } from "@passui/solid/search-field"
import { Button } from "@passui/solid/button"

export function SearchFieldToolbar() {
    const [query, setQuery] = createSignal("")
    return (
        <div class="flex w-full max-w-lg items-center gap-2 rounded-4xl bg-elevated p-2 shadow-sm ring-1 ring-separator/60">
            <SearchField
                aria-label="Search people"
                placeholder="Search people"
                class="flex-1"
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
            />
            <Button variant="secondary" size="sm">
                Filters
            </Button>
            <Button variant="accent" size="sm">
                Invite
            </Button>
        </div>
    )
}
