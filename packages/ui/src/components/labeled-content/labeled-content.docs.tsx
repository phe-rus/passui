import { LabeledContentValues } from "./examples/labeled-content-values"
import { LabeledContentWide } from "./examples/labeled-content-wide"
import { LabeledContentDescriptions } from "./examples/labeled-content-descriptions"
import { defineDocs } from "../../docs/types"
import { Toggle } from "../toggle/toggle"
import { LabeledContentShowcase } from "./examples/labeled-content-showcase"
import { LabeledContentUsage } from "./examples/labeled-content-usage"
import { LabeledContent } from "./labeled-content"

type DemoProps = {
    label: string
    description?: string
    stacked?: boolean
    wide?: boolean
}

export const labeledContentDocs = defineDocs<DemoProps>()({
    slug: "labeled-content",
    name: "LabeledContent",
    importPath: "@passui/react",
    controls: {
        label: {
            kind: "text",
            default: "Show previews",
            required: true,
        },
        description: {
            kind: "text",
            default: "Shows the first lines of each note.",
        },
        stacked: { kind: "boolean", default: false },
        wide: { kind: "boolean", default: false },
    },
    render: (values) => (
        <div className="w-full max-w-sm rounded-3xl border border-separator/60 bg-elevated">
            <LabeledContent {...values}>
                <Toggle
                    label={values.label}
                    labelHidden
                    checked
                    onChange={() => {}}
                />
            </LabeledContent>
        </div>
    ),
    childrenSnippet: () => ({
        imports: [
            'import { useState } from "react"',
            'import { Toggle } from "@passui/react/toggle"',
        ],
        setup: ["const [on, setOn] = useState(true)"],
        children:
            '<Toggle label="Show previews" labelHidden checked={on} onChange={setOn} />',
    }),
    usage: LabeledContentUsage,
    showcase: LabeledContentShowcase,
    examples: [
        {
            id: "descriptions",
            component: LabeledContentDescriptions,
        },
        {
            id: "wide",
            component: LabeledContentWide,
            playground: { wide: true },
        },
        { id: "values", component: LabeledContentValues },
    ],
})
