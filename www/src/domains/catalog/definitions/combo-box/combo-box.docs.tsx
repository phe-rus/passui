import { useState } from "react"
import { ComboBox } from "@passui/react/combo-box"
import { defineDocs } from "../types"
import { ComboBoxUsage } from "./examples/combo-box-usage"
import { ComboBoxShowcase } from "./examples/combo-box-showcase"
import { ComboBoxLanguages } from "./examples/combo-box-languages"
import { ComboBoxDisabled } from "./examples/combo-box-disabled"
function Demo({ label }: { label: string }) {
    const options = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
    ]
    const [value, setValue] = useState("react")
    return (
        <ComboBox
            label={label}
            value={value}
            onChange={setValue}
            options={options}
            emptyLabel="No frameworks found"
        />
    )
}
export const comboBoxDocs = defineDocs<{ label: string }>()({
    slug: "combo-box",
    name: "ComboBox",
    importPath: "@passui/react/combo-box",
    controls: { label: { kind: "text", default: "Choose a framework", required: true } },
    render: (props) => <Demo {...props} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: [
            'const options = [{"value": "react", "label": "React"}, {"value": "vue", "label": "Vue"}, {"value": "svelte", "label": "Svelte"}]',
            'const [value, setValue] = useState("react")',
        ],
        expressionProps: { options: "options", value: "value", onChange: "setValue" },
        extraProps: { emptyLabel: "No matches" },
        children: "",
    }),
    usage: ComboBoxUsage,
    showcase: ComboBoxShowcase,
    examples: [
        { id: "languages", component: ComboBoxLanguages },
        { id: "disabled", component: ComboBoxDisabled },
    ],
})
