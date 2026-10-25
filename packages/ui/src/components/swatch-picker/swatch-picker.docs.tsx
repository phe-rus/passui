import { SwatchPickerLabels } from "./examples/swatch-picker-labels"
import { SwatchPickerAccents } from "./examples/swatch-picker-accents"
import { useState } from "react"
import { accents } from "@passui/tokens/accent"
import { defineDocs } from "../../docs/types"
import { SwatchPickerShowcase } from "./examples/swatch-picker-showcase"
import { SwatchPickerUsage } from "./examples/swatch-picker-usage"
import { SwatchPicker } from "./swatch-picker"

type DemoProps = { label: string }

function SwatchPickerDemo({ label }: DemoProps) {
    const [accent, setAccent] = useState<string>("blush")
    return (
        <SwatchPicker
            label={label}
            value={accent}
            onChange={setAccent}
            options={Object.values(accents).map((option) => ({
                value: option.id,
                label: option.name,
                color: option.swatch,
                ink: option.light.accentText,
            }))}
        />
    )
}

export const swatchPickerDocs = defineDocs<DemoProps>()({
    slug: "swatch-picker",
    name: "SwatchPicker",
    importPath: "@passui/react",
    controls: {
        label: {
            kind: "text",
            default: "Accent colour",
            required: true,
        },
    },
    render: (values) => <SwatchPickerDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: [
            'const [colour, setColour] = useState("blush")',
        ],
        children: "",
        expressionProps: {
            value: "colour",
            onChange: "setColour",
            options:
                '[{ value: "blush", label: "Blush", color: "#f2d4d7", ink: "#9e3b4f" }]',
        },
    }),
    usage: SwatchPickerUsage,
    showcase: SwatchPickerShowcase,
    examples: [
        { id: "accents", component: SwatchPickerAccents },
        { id: "labels", component: SwatchPickerLabels },
    ],
})
