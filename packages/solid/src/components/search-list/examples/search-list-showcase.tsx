import { For } from "solid-js"
import { toast } from "@passui/solid/toast"
import {
    SearchList,
    SearchListEmpty,
    SearchListField,
    SearchListGroup,
    SearchListItem,
    SearchListResults,
} from "@passui/solid/search-list"

const people = [
    { name: "Aiko Kamado", role: "Design" },
    { name: "Kenji Mori", role: "Engineering" },
    { name: "Mira Patel", role: "Support" },
]
const actions = [
    { name: "New project", keywords: ["create"] },
    { name: "Invite people", keywords: ["team", "share"] },
    { name: "Open settings", keywords: ["preferences"] },
]

export function SearchListShowcase() {
    return (
        <SearchList class="w-full max-w-sm rounded-4xl bg-elevated p-3 shadow-sm ring-1 ring-separator/60">
            <SearchListField placeholder="Search people and actions" />
            <SearchListResults class="mt-2 max-h-80">
                <SearchListGroup heading="People">
                    <For each={people}>
                        {(person) => (
                            <SearchListItem
                                value={person.name}
                                keywords={[person.role]}
                                onSelect={(name) =>
                                    toast(`Opened ${name}`)
                                }
                            >
                                <span class="flex-1 text-subheadline text-label">
                                    {person.name}
                                </span>
                                <span class="text-caption text-label-tertiary">
                                    {person.role}
                                </span>
                            </SearchListItem>
                        )}
                    </For>
                </SearchListGroup>
                <SearchListGroup heading="Actions">
                    <For each={actions}>
                        {(action) => (
                            <SearchListItem
                                value={action.name}
                                keywords={action.keywords}
                                onSelect={(name) =>
                                    toast(name)
                                }
                            >
                                <span class="text-subheadline text-label">
                                    {action.name}
                                </span>
                            </SearchListItem>
                        )}
                    </For>
                </SearchListGroup>
                <SearchListEmpty class="px-3 py-8 text-center text-footnote text-label-secondary">
                    No people or actions match
                </SearchListEmpty>
            </SearchListResults>
        </SearchList>
    )
}
