import { SegmentedControlOverflow } from "./examples/segmented-control-overflow"
import { SegmentedControlViews } from "./examples/segmented-control-views"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { SegmentedControlShowcase } from "./examples/segmented-control-showcase"
import { SegmentedControlUsage } from "./examples/segmented-control-usage"
import { SegmentedControl } from "./segmented-control"

type DemoProps = { label: string }

function SegmentedControlDemo({ label }: DemoProps) {
    const [view, setView] = useState("week")
    return (
        <div className="w-full max-w-xs">
            <SegmentedControl
                label={label}
                value={view}
                onChange={setView}
                options={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                ]}
            />
        </div>
    )
}

export const segmentedControlDocs = defineDocs<DemoProps>()({
    slug: "segmented-control",
    name: "SegmentedControl",
    importPath: "@passui/react",
    controls: {
        label: {
            kind: "text",
            default: "Calendar view",
            required: true,
        },
    },
    render: (values) => <SegmentedControlDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [view, setView] = useState("week")'],
        children: "",
        expressionProps: {
            value: "view",
            onChange: "setView",
            options:
                '[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]',
        },
    }),
    usage: SegmentedControlUsage,
    showcase: SegmentedControlShowcase,
    examples: [
        { id: "views", component: SegmentedControlViews },
        {
            id: "overflow",
            component: SegmentedControlOverflow,
        },
    ],
})
