import { createSignal, For } from "solid-js"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListItem,
    SearchListEmpty,
} from "@passui/solid/search-list"
import { toast } from "@passui/solid/toast"

const pages = [
    "Profile",
    "Password",
    "Passkeys",
    "Devices",
    "Language",
    "Privacy",
]

export function SearchListDropdown() {
    const [open, setOpen] = createSignal(false)
    return (
        <div class="h-72 w-full max-w-xs">
            <SearchList open={open()} class="w-full">
                <SearchListField
                    placeholder="Search your account"
                    onFocus={() => setOpen(true)}
                    onBlur={() =>
                        setTimeout(() => setOpen(false), 120)
                    }
                />
                <SearchListResults class="glass-menu absolute inset-x-0 top-full z-10 mt-2 max-h-56 rounded-4xl">
                    <For each={pages}>
                        {(page) => (
                            <SearchListItem
                                value={page}
                                onSelect={(value) =>
                                    toast(`Opened ${value}`)
                                }
                            >
                                {page}
                            </SearchListItem>
                        )}
                    </For>
                    <SearchListEmpty class="px-3 py-4 text-footnote text-label-secondary">
                        No pages found
                    </SearchListEmpty>
                </SearchListResults>
            </SearchList>
        </div>
    )
}
