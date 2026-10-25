import { StatTileFilters } from "./examples/stat-tile-filters"
import { StatTileGrid } from "./examples/stat-tile-grid"
import { defineDocs } from "../../docs/types"
import { StatTileShowcase } from "./examples/stat-tile-showcase"
import { StatTileUsage } from "./examples/stat-tile-usage"
import { StatTile } from "./stat-tile"

type DemoProps = {
    label: string
    caption?: string
    critical?: boolean
    active?: boolean
}

export const statTileDocs = defineDocs<DemoProps>()({
    slug: "stat-tile",
    name: "StatTile",
    importPath: "@passui/react/stat-tile",
    controls: {
        label: {
            kind: "text",
            default: "Failed sign ins",
            required: true,
        },
        caption: {
            kind: "text",
            default: "In the last hour",
        },
        critical: { kind: "boolean", default: true },
        active: { kind: "boolean", default: false },
    },
    render: ({ critical, ...values }) => (
        <div className="w-56">
            <StatTile
                {...values}
                value={3}
                tone={critical ? "critical" : undefined}
            />
        </div>
    ),
    childrenSnippet: ({ critical }) => ({
        imports: [],
        children: "",
        omit: ["critical"],
        expressionProps: {
            value: "3",
            ...(critical ? { tone: '"critical"' } : {}),
        },
    }),
    usage: StatTileUsage,
    showcase: StatTileShowcase,
    examples: [
        { id: "grid", component: StatTileGrid },
        {
            id: "filters",
            component: StatTileFilters,
            playground: { active: true },
        },
    ],
})
