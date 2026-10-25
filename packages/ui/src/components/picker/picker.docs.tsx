import { PickerDetails } from "./examples/picker-details"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { PickerSearchable } from "./examples/picker-searchable"
import { PickerShowcase } from "./examples/picker-showcase"
import { PickerUsage } from "./examples/picker-usage"
import { Picker } from "./picker"

type DemoProps = { label: string; searchable?: boolean }

function PickerDemo(props: DemoProps) {
    const [size, setSize] = useState("medium")
    return (
        <div className="w-full max-w-xs">
            <Picker
                {...props}
                value={size}
                onChange={setSize}
                searchPlaceholder="Search"
                options={[
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                    {
                        value: "extra-large",
                        label: "Extra large",
                    },
                ]}
            />
        </div>
    )
}

export const pickerDocs = defineDocs<DemoProps>()({
    slug: "picker",
    name: "Picker",
    importPath: "@passui/react",
    controls: {
        label: {
            kind: "text",
            default: "Text size",
            required: true,
        },
        searchable: { kind: "boolean", default: false },
    },
    render: (values) => <PickerDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [size, setSize] = useState("medium")'],
        children: "",
        expressionProps: {
            value: "size",
            onChange: "setSize",
            options:
                '[{ value: "small", label: "Small" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large" }]',
        },
    }),
    usage: PickerUsage,
    showcase: PickerShowcase,
    examples: [
        {
            id: "searchable",
            component: PickerSearchable,
            playground: { searchable: true },
        },
        { id: "details", component: PickerDetails },
    ],
})
