import {
    Mail01Icon,
    Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { TextFieldIcons } from "./examples/text-field-icons"
import { TextFieldShowcase } from "./examples/text-field-showcase"
import { TextFieldUsage } from "./examples/text-field-usage"
import { TextFieldValidation } from "./examples/text-field-validation"
import { TextField, type TextFieldProps } from "./text-field"

// The icons are nodes, so the playground offers a switch for each and
// the snippet writes the icon itself.
type DemoProps = Pick<
    TextFieldProps,
    "label" | "placeholder" | "disabled"
> & {
    icon?: boolean
    trailingIcon?: boolean
}

function TextFieldDemo({
    icon,
    trailingIcon,
    ...props
}: DemoProps) {
    const [value, setValue] = useState("")
    return (
        <div className="w-full max-w-xs">
            <TextField
                {...props}
                icon={
                    icon && (
                        <HugeiconsIcon
                            icon={Mail01Icon}
                            size={18}
                        />
                    )
                }
                trailingIcon={
                    trailingIcon && (
                        <HugeiconsIcon
                            icon={Tick02Icon}
                            size={18}
                        />
                    )
                }
                value={value}
                onChange={(event) =>
                    setValue(event.target.value)
                }
            />
        </div>
    )
}

export const textFieldDocs = defineDocs<DemoProps>()({
    slug: "text-field",
    name: "TextField",
    importPath: "@passui/react/text-field",
    controls: {
        label: {
            kind: "text",
            default: "Email",
            required: true,
        },
        placeholder: {
            kind: "text",
            default: "you@example.com",
        },
        disabled: { kind: "boolean", default: false },
        icon: { kind: "boolean", default: false },
        trailingIcon: { kind: "boolean", default: false },
    },
    render: (values) => <TextFieldDemo {...values} />,
    childrenSnippet: ({ icon, trailingIcon }) => ({
        imports: [
            'import { useState } from "react"',
            ...(icon || trailingIcon
                ? [
                      `import { ${[icon && "Mail01Icon", trailingIcon && "Tick02Icon"].filter(Boolean).join(", ")} } from "@hugeicons/core-free-icons"`,
                      'import { HugeiconsIcon } from "@hugeicons/react"',
                  ]
                : []),
        ],
        setup: ['const [value, setValue] = useState("")'],
        children: "",
        omit: ["icon", "trailingIcon"],
        expressionProps: {
            ...(icon
                ? {
                      icon: "<HugeiconsIcon icon={Mail01Icon} size={18} />",
                  }
                : {}),
            ...(trailingIcon
                ? {
                      trailingIcon:
                          "<HugeiconsIcon icon={Tick02Icon} size={18} />",
                  }
                : {}),
            value: "value",
            onChange:
                "(event) => setValue(event.target.value)",
        },
    }),
    usage: TextFieldUsage,
    showcase: TextFieldShowcase,
    examples: [
        {
            id: "icons",
            component: TextFieldIcons,
            playground: { icon: true, trailingIcon: true },
        },
        { id: "validation", component: TextFieldValidation },
    ],
})
