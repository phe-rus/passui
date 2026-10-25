import type { ComponentProps } from "react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { ToggleCheckboxes } from "./examples/toggle-checkboxes"
import { ToggleSettings } from "./examples/toggle-settings"
import { ToggleShowcase } from "./examples/toggle-showcase"
import { ToggleUsage } from "./examples/toggle-usage"
import { Toggle } from "./toggle"

type ToggleProps = ComponentProps<typeof Toggle>
type DemoProps = Omit<ToggleProps, "checked" | "onChange">

/** Holds its own state so the playground can flip it. */
function ToggleDemo(props: DemoProps) {
    const [checked, setChecked] = useState(true)
    return (
        <Toggle
            {...props}
            checked={checked}
            onChange={setChecked}
        />
    )
}

export const toggleDocs = defineDocs<ToggleProps>()({
    slug: "toggle",
    name: "Toggle",
    importPath: "@passui/react/toggle",
    controls: {
        style: {
            kind: "select",
            options: { switch: true, checkbox: true },
            default: "switch",
        },
        disabled: { kind: "boolean", default: false },
        mixed: { kind: "boolean", default: false },
        labelHidden: { kind: "boolean", default: false },
        label: {
            kind: "text",
            default: "Wi-Fi",
            required: true,
        },
    },
    render: (values) => <ToggleDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: [
            "const [checked, setChecked] = useState(true)",
        ],
        children: "",
        expressionProps: {
            checked: "checked",
            onChange: "setChecked",
        },
    }),
    usage: ToggleUsage,
    showcase: ToggleShowcase,
    examples: [
        { id: "settings", component: ToggleSettings },
        {
            id: "checkboxes",
            component: ToggleCheckboxes,
            playground: {
                style: "checkbox",
                label: "Remember me",
            },
        },
    ],
})
