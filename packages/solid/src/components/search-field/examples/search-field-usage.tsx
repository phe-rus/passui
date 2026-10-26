import { createSignal } from "solid-js"
import { SearchField } from "@passui/solid/search-field"

export function SearchFieldUsage() {
    const [query, setQuery] = createSignal("")
    return (
        <div class="flex flex-col gap-3">
            <SearchField
                aria-label="Find a file"
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
            />
            <output>{query() || "Type to search"}</output>
        </div>
    )
}
