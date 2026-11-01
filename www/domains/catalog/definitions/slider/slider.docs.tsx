import { useState } from "react"
import { Slider } from "@passui/react/slider"
import { defineDocs } from "../types"
import { SliderUsage } from "./examples/slider-usage"
import { SliderShowcase } from "./examples/slider-showcase"
import { SliderVolume } from "./examples/slider-volume"
import { SliderDisabled } from "./examples/slider-disabled"

function SliderDemo({ label, disabled }: { label: string; disabled: boolean }) {
    const [value, setValue] = useState(45)
    return <Slider label={label} value={value} onChange={setValue} disabled={disabled} />
}

export const sliderDocs = defineDocs<{ label: string; disabled?: boolean }>()({
    slug: "slider",
    name: "Slider",
    importPath: "@passui/react/slider",
    controls: {
        label: { kind: "text", default: "Volume", required: true },
        disabled: { kind: "boolean", default: false },
    },
    render: (values) => <SliderDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ["const [value, setValue] = useState(45)"],
        children: "",
        expressionProps: { value: "value", onChange: "setValue" },
    }),
    usage: SliderUsage,
    showcase: SliderShowcase,
    examples: [
        { id: "volume", component: SliderVolume },
        { id: "disabled", component: SliderDisabled, playground: { disabled: true } },
    ],
})
