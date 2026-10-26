import { createSignal } from "solid-js"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListGroup,
    SearchListItem,
    SearchListEmpty,
} from "@passui/solid/search-list"

export function SearchListGroups() {
    const [selected, setSelected] = createSignal("")
    return (
        <div class="grid w-full max-w-sm gap-2">
            <SearchList>
                <SearchListField placeholder="Find a setting" />
                <SearchListResults>
                    <SearchListGroup heading="Account">
                        <SearchListItem
                            value="Profile"
                            onSelect={setSelected}
                        >
                            Profile
                        </SearchListItem>
                        <SearchListItem
                            value="Security"
                            onSelect={setSelected}
                        >
                            Security
                        </SearchListItem>
                    </SearchListGroup>
                    <SearchListGroup heading="Workspace">
                        <SearchListItem
                            value="Members"
                            onSelect={setSelected}
                        >
                            Members
                        </SearchListItem>
                        <SearchListItem
                            value="Billing"
                            onSelect={setSelected}
                        >
                            Billing
                        </SearchListItem>
                    </SearchListGroup>
                    <SearchListEmpty>
                        No settings found
                    </SearchListEmpty>
                </SearchListResults>
            </SearchList>
            <output class="text-footnote text-label-secondary">
                {selected()}
            </output>
        </div>
    )
}
