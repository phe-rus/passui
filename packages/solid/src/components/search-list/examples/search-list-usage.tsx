import { For } from "solid-js"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListItem,
    SearchListEmpty,
} from "@passui/solid/search-list"
const fruits = ["Apple", "Banana", "Cherry", "Mango"]
export function SearchListUsage() {
    return (
        <SearchList class="w-full max-w-xs">
            <SearchListField placeholder="Search fruit" />
            <SearchListResults class="mt-2">
                <For each={fruits}>
                    {(fruit) => (
                        <SearchListItem value={fruit}>
                            {fruit}
                        </SearchListItem>
                    )}
                </For>
                <SearchListEmpty class="px-3 py-4 text-footnote text-label-secondary">
                    No fruit found
                </SearchListEmpty>
            </SearchListResults>
        </SearchList>
    )
}
