import { createSignal } from "solid-js"
import { SearchField } from "@passui/solid/search-field"

export function SearchFieldUsage() {
    const [query, setQuery] = createSignal("")
    return (
        <div class="w-full max-w-xs">
            <SearchField
                aria-label="Search notes"
                placeholder="Search notes"
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
            />
        </div>
    )
}
