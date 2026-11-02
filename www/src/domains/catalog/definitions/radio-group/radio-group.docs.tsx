import { useState } from "react"
import { RadioGroup } from "@passui/react/radio-group"
import { defineDocs } from "../types"
import { RadioGroupUsage } from "./examples/radio-group-usage"
import { RadioGroupShowcase } from "./examples/radio-group-showcase"
import { RadioGroupCompact } from "./examples/radio-group-compact"
import { RadioGroupDisabled } from "./examples/radio-group-disabled"
function Demo({ label }: { label: string }) {
    const options = [
        { value: "system", label: "System" },
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
    ]
    const [value, setValue] = useState("system")
    return <RadioGroup label={label} value={value} onChange={setValue} options={options} />
}
export const radioGroupDocs = defineDocs<{ label: string }>()({
    slug: "radio-group",
    name: "RadioGroup",
    importPath: "@passui/react/radio-group",
    controls: { label: { kind: "text", default: "Appearance", required: true } },
    render: (props) => <Demo {...props} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: [
            'const options = [{"value": "system", "label": "System"}, {"value": "light", "label": "Light"}, {"value": "dark", "label": "Dark"}]',
            'const [value, setValue] = useState("system")',
        ],
        expressionProps: { options: "options", value: "value", onChange: "setValue" },
        extraProps: {},
        children: "",
    }),
    usage: RadioGroupUsage,
    showcase: RadioGroupShowcase,
    examples: [
        { id: "compact", component: RadioGroupCompact },
        { id: "disabled", component: RadioGroupDisabled },
    ],
})
