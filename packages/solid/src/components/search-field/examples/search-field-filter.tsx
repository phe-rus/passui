import { createSignal, For } from "solid-js"
import { SearchField } from "@passui/solid/search-field"

const files = [
    "Design brief",
    "Release notes",
    "Project roadmap",
    "Meeting notes",
]
export function SearchFieldFilter() {
    const [query, setQuery] = createSignal("")
    return (
        <div class="grid w-full max-w-sm gap-3">
            <SearchField
                aria-label="Search files"
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
                placeholder="Find a document"
            />
            <ul class="grid gap-2 text-footnote">
                <For
                    each={files.filter((file) =>
                        file
                            .toLowerCase()
                            .includes(query().toLowerCase())
                    )}
                >
                    {(file) => (
                        <li class="rounded-xl bg-fill p-2">
                            {file}
                        </li>
                    )}
                </For>
            </ul>
        </div>
    )
}
