import { SearchFieldExpanding } from "./examples/search-field-expanding"
import { SearchFieldToolbar } from "./examples/search-field-toolbar"
import { SearchFieldFilter } from "./examples/search-field-filter"
import type { SearchFieldProps } from "@passui/react/search-field"
import { useState } from "react"
import { defineDocs } from "../types"
import { SearchFieldShowcase } from "./examples/search-field-showcase"
import { SearchFieldUsage } from "./examples/search-field-usage"
import { SearchField } from "@passui/react/search-field"

function SearchFieldDemo(
    props: Pick<SearchFieldProps, "placeholder" | "disabled" | "collapsible">
) {
    const [query, setQuery] = useState("")
    return (
        <div className="w-full max-w-xs">
            <SearchField
                {...props}
                aria-label="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
        </div>
    )
}

export const searchFieldDocs = defineDocs<SearchFieldProps>()({
    slug: "search-field",
    name: "SearchField",
    importPath: "@passui/react",
    controls: {
        collapsible: { kind: "boolean", default: false },
        placeholder: { kind: "text", default: "Search" },
        disabled: { kind: "boolean", default: false },
    },
    render: (values) => <SearchFieldDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [query, setQuery] = useState("")'],
        children: "",
        extraProps: { "aria-label": "Search" },
        expressionProps: {
            value: "query",
            onChange: "(event) => setQuery(event.target.value)",
        },
    }),
    usage: SearchFieldUsage,
    showcase: SearchFieldShowcase,
    examples: [
        { id: "expanding", component: SearchFieldExpanding, playground: { collapsible: true } },
        { id: "filter", component: SearchFieldFilter },
        { id: "toolbar", component: SearchFieldToolbar },
    ],
})
