import { createSignal, For, Show } from "solid-js"
import { SearchField } from "@passui/solid/search-field"

const people = [
    "Aiko Kamado",
    "Ben Ito",
    "Chiara Rossi",
    "Dev Patel",
    "Emma Laurent",
    "Farah Haddad",
]

export function SearchFieldShowcase() {
    const [query, setQuery] = createSignal("")
    const results = () =>
        people.filter((person) =>
            person
                .toLowerCase()
                .includes(query().trim().toLowerCase())
        )
    return (
        <div class="flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <SearchField
                aria-label="Search people"
                placeholder="Search people"
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
            />
            <ul class="m-0 flex list-none flex-col p-0">
                <For each={results()}>
                    {(person) => (
                        <li class="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-fill/60">
                            <span class="flex size-8 items-center justify-center rounded-full bg-accent-soft text-caption font-bold text-accent-text">
                                {person
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")}
                            </span>
                            <span class="text-subheadline text-label">
                                {person}
                            </span>
                        </li>
                    )}
                </For>
                <Show when={results().length === 0}>
                    <li class="px-2 py-6 text-center text-footnote text-label-secondary">
                        No one matches “{query()}”.
                    </li>
                </Show>
            </ul>
        </div>
    )
}
