import { createSignal } from "solid-js"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListItem,
    SearchListEmpty,
} from "@passui/solid/search-list"

export function SearchListDropdown() {
    const [selected, setSelected] = createSignal("")
    return (
        <div class="w-full max-w-sm">
            <SearchList>
                <SearchListField placeholder="Search commands" />
                <SearchListResults>
                    <SearchListItem
                        value="New note"
                        onSelect={setSelected}
                    >
                        New note
                    </SearchListItem>
                    <SearchListItem
                        value="Open workspace"
                        onSelect={setSelected}
                    >
                        Open workspace
                    </SearchListItem>
                    <SearchListItem
                        value="View settings"
                        onSelect={setSelected}
                    >
                        View settings
                    </SearchListItem>
                    <SearchListEmpty>
                        No commands found
                    </SearchListEmpty>
                </SearchListResults>
            </SearchList>
            <output class="text-footnote text-label-secondary">
                {selected() && `Selected: ${selected()}`}
            </output>
        </div>
    )
}
