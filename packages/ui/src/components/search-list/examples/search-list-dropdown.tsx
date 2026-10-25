import { toast } from "@passui/react"
import {
    SearchList,
    SearchListEmpty,
    SearchListField,
    SearchListItem,
    SearchListResults,
} from "@passui/react/search-list"
import { useState } from "react"

const pages = [
    "Profile",
    "Password",
    "Passkeys",
    "Devices",
    "Language",
    "Privacy",
]

export function SearchListDropdown() {
    const [open, setOpen] = useState(false)

    return (
        <div className="h-72 w-full max-w-xs">
            <SearchList open={open} className="w-full">
                <SearchListField
                    placeholder="Search your account"
                    onFocus={() => setOpen(true)}
                    // let a click on a result land before closing
                    onBlur={() =>
                        setTimeout(() => setOpen(false), 120)
                    }
                />
                <SearchListResults className="glass-menu absolute inset-x-0 top-full z-10 mt-2 max-h-56 rounded-4xl">
                    {pages.map((page) => (
                        <SearchListItem
                            key={page}
                            value={page}
                            onSelect={(value) =>
                                toast(`Opened ${value}`)
                            }
                        >
                            {page}
                        </SearchListItem>
                    ))}
                    <SearchListEmpty className="px-3 py-4 text-footnote text-label-secondary">
                        No pages found
                    </SearchListEmpty>
                </SearchListResults>
            </SearchList>
        </div>
    )
}
