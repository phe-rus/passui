import { For } from "solid-js"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListGroup,
    SearchListItem,
    SearchListEmpty,
} from "@passui/solid/search-list"

const groups = [
    {
        heading: "Security",
        items: [
            { value: "Password", keywords: ["sign in"] },
            {
                value: "Passkeys",
                keywords: ["face", "touch"],
            },
            {
                value: "Two-step verification",
                keywords: ["2fa", "code"],
            },
        ],
    },
    {
        heading: "Preferences",
        items: [
            { value: "Language", keywords: ["locale"] },
            {
                value: "Appearance",
                keywords: ["dark", "theme"],
            },
        ],
    },
]

export function SearchListGroups() {
    return (
        <SearchList class="w-full max-w-xs rounded-3xl bg-elevated p-2 ring-1 ring-separator/60">
            <SearchListField placeholder="Try 2fa or dark" />
            <SearchListResults class="mt-2 max-h-72">
                <For each={groups}>
                    {(group) => (
                        <SearchListGroup
                            heading={group.heading}
                        >
                            <For each={group.items}>
                                {(item) => (
                                    <SearchListItem
                                        value={item.value}
                                        keywords={
                                            item.keywords
                                        }
                                    >
                                        {item.value}
                                    </SearchListItem>
                                )}
                            </For>
                        </SearchListGroup>
                    )}
                </For>
                <SearchListEmpty class="px-3 py-6 text-center text-footnote text-label-secondary">
                    Nothing matches that search
                </SearchListEmpty>
            </SearchListResults>
        </SearchList>
    )
}
