import { SearchListDropdown } from "./examples/search-list-dropdown"
import { jsxAttribute, jsxText } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { SearchListGroups } from "./examples/search-list-groups"
import { SearchListShowcase } from "./examples/search-list-showcase"
import { SearchListUsage } from "./examples/search-list-usage"
import {
    SearchList,
    SearchListEmpty,
    SearchListField,
    SearchListItem,
    SearchListResults,
} from "./search-list"

// `placeholder` belongs to SearchListField, `empty` to SearchListEmpty;
// the snippet writes both into the children.
type DemoProps = {
    open?: boolean
    placeholder: string
    empty: string
}

const settings = [
    "Password",
    "Passkeys",
    "Two-step verification",
    "Devices",
    "Language",
]

export const searchListDocs = defineDocs<DemoProps>()({
    slug: "search-list",
    name: "SearchList",
    importPath: "@passui/react/search-list",
    controls: {
        open: { kind: "boolean", default: true },
        placeholder: {
            kind: "text",
            default: "Search settings",
        },
        empty: { kind: "text", default: "No results" },
    },
    render: ({ open, placeholder, empty }) => (
        <SearchList
            open={open}
            className="w-full max-w-xs rounded-3xl bg-elevated p-2 ring-1 ring-separator/60"
        >
            <SearchListField placeholder={placeholder} />
            <SearchListResults className="mt-2 max-h-56">
                {settings.map((item) => (
                    <SearchListItem key={item} value={item}>
                        {item}
                    </SearchListItem>
                ))}
                <SearchListEmpty className="px-3 py-6 text-center text-footnote text-label-secondary">
                    {empty}
                </SearchListEmpty>
            </SearchListResults>
        </SearchList>
    ),
    childrenSnippet: ({ placeholder, empty }) => ({
        imports: [
            'import { SearchListEmpty, SearchListField, SearchListItem, SearchListResults } from "@passui/react/search-list"',
        ],
        omit: ["placeholder", "empty"],
        children: [
            "",
            `    <SearchListField ${jsxAttribute("placeholder", placeholder)} />`,
            "    <SearchListResults>",
            '        <SearchListItem value="Password">Password</SearchListItem>',
            '        <SearchListItem value="Passkeys">Passkeys</SearchListItem>',
            `        <SearchListEmpty>${jsxText(empty)}</SearchListEmpty>`,
            "    </SearchListResults>",
            "",
        ].join("\n"),
    }),
    usage: SearchListUsage,
    showcase: SearchListShowcase,
    examples: [
        { id: "groups", component: SearchListGroups },
        {
            id: "dropdown",
            component: SearchListDropdown,
            playground: { open: false },
        },
    ],
})
