import { createSignal } from "solid-js"
import { SearchField } from "@passui/solid/search-field"
import { Button } from "@passui/solid/button"

export function SearchFieldToolbar() {
    const [query, setQuery] = createSignal("")
    return (
        <div class="flex w-full max-w-md items-end gap-2">
            <div class="min-w-0 flex-1">
                <SearchField
                    aria-label="Search people"
                    value={query()}
                    onInput={(event) =>
                        setQuery(event.currentTarget.value)
                    }
                    placeholder="Search people"
                />
            </div>
            <Button
                variant="secondary"
                onClick={() => setQuery("")}
            >
                Clear
            </Button>
        </div>
    )
}
