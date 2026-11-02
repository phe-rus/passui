import {
    SearchList,
    SearchListEmpty,
    SearchListField,
    SearchListItem,
    SearchListResults,
} from "@passui/react/search-list"

const fruits = ["Apple", "Banana", "Cherry", "Mango"]

export function SearchListUsage() {
    return (
        <SearchList className="w-full max-w-xs">
            <SearchListField placeholder="Search fruit" />
            <SearchListResults className="mt-2">
                {fruits.map((fruit) => (
                    <SearchListItem key={fruit} value={fruit}>
                        {fruit}
                    </SearchListItem>
                ))}
                <SearchListEmpty className="px-3 py-4 text-footnote text-label-secondary">
                    No fruit found
                </SearchListEmpty>
            </SearchListResults>
        </SearchList>
    )
}
