import { createSignal } from "solid-js"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListItem,
    SearchListEmpty,
} from "@passui/solid/search-list"
export function SearchListUsage() {
    const [selected, setSelected] = createSignal("")
    return (
        <div class="w-full max-w-sm">
            <SearchList>
                <SearchListField placeholder="Find a page" />
                <SearchListResults>
                    <SearchListItem
                        value="Introduction"
                        onSelect={setSelected}
                    >
                        Introduction
                    </SearchListItem>
                    <SearchListItem
                        value="Installation"
                        onSelect={setSelected}
                    >
                        Installation
                    </SearchListItem>
                    <SearchListEmpty>
                        No pages found
                    </SearchListEmpty>
                </SearchListResults>
            </SearchList>
            <output>{selected()}</output>
        </div>
    )
}
