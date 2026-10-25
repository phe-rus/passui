import {
    SearchList,
    SearchListEmpty,
    SearchListField,
    SearchListGroup,
    SearchListItem,
    SearchListResults,
} from "@passui/react/search-list"

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
        <SearchList className="w-full max-w-xs rounded-3xl bg-elevated p-2 ring-1 ring-separator/60">
            <SearchListField placeholder="Try 2fa or dark" />
            <SearchListResults className="mt-2 max-h-72">
                {groups.map((group) => (
                    <SearchListGroup
                        key={group.heading}
                        heading={group.heading}
                    >
                        {group.items.map((item) => (
                            <SearchListItem
                                key={item.value}
                                value={item.value}
                                keywords={item.keywords}
                            >
                                {item.value}
                            </SearchListItem>
                        ))}
                    </SearchListGroup>
                ))}
                <SearchListEmpty className="px-3 py-6 text-center text-footnote text-label-secondary">
                    Nothing matches that search
                </SearchListEmpty>
            </SearchListResults>
        </SearchList>
    )
}
