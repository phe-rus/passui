import { createSignal, For, Show } from "solid-js"
import { SearchField } from "@passui/solid/search-field"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"

const apps = [
    { name: "Pass console", people: 12 },
    { name: "Accounts", people: 1284 },
    { name: "Notables", people: 431 },
    { name: "Showcase", people: 58 },
]
export function SearchFieldFilter() {
    const [query, setQuery] = createSignal("")
    const matches = () =>
        apps.filter((app) =>
            app.name
                .toLowerCase()
                .includes(query().trim().toLowerCase())
        )
    return (
        <div class="flex w-full max-w-sm flex-col gap-3">
            <SearchField
                aria-label="Search applications"
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
                placeholder="Search applications"
            />
            <Section>
                <Show
                    when={matches().length}
                    fallback={
                        <p class="px-4 py-6 text-center text-footnote text-label-secondary">
                            No applications match “{query()}”
                        </p>
                    }
                >
                    <For each={matches()}>
                        {(app) => (
                            <LabeledContent label={app.name}>
                                <span class="text-footnote text-label-secondary tabular-nums">
                                    {app.people} people
                                </span>
                            </LabeledContent>
                        )}
                    </For>
                </Show>
            </Section>
        </div>
    )
}
