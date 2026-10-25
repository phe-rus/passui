import { SecureFieldNewPassword } from "./examples/secure-field-new-password"
import { SecureFieldReveal } from "./examples/secure-field-reveal"
import type { ComponentProps } from "react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { SecureFieldShowcase } from "./examples/secure-field-showcase"
import { SecureFieldUsage } from "./examples/secure-field-usage"
import { SecureField } from "./secure-field"

type SecureFieldProps = ComponentProps<typeof SecureField>
type DemoProps = Pick<
    SecureFieldProps,
    "label" | "placeholder" | "disabled"
>

function SecureFieldDemo(props: DemoProps) {
    const [value, setValue] = useState("")
    return (
        <div className="w-full max-w-xs">
            <SecureField
                {...props}
                value={value}
                revealLabels={{ show: "Show", hide: "Hide" }}
                onChange={(event) =>
                    setValue(event.target.value)
                }
            />
        </div>
    )
}

export const secureFieldDocs = defineDocs<SecureFieldProps>()(
    {
        slug: "secure-field",
        name: "SecureField",
        importPath: "@passui/react/secure-field",
        controls: {
            label: {
                kind: "text",
                default: "Password",
                required: true,
            },
            placeholder: {
                kind: "text",
                default: "At least 8 characters",
            },
            disabled: { kind: "boolean", default: false },
        },
        render: (values) => <SecureFieldDemo {...values} />,
        childrenSnippet: () => ({
            imports: ['import { useState } from "react"'],
            setup: ['const [value, setValue] = useState("")'],
            children: "",
            expressionProps: {
                value: "value",
                revealLabels:
                    '{ show: "Show", hide: "Hide" }',
                onChange:
                    "(event) => setValue(event.target.value)",
            },
        }),
        usage: SecureFieldUsage,
        showcase: SecureFieldShowcase,
        examples: [
            { id: "reveal", component: SecureFieldReveal },
            {
                id: "new-password",
                component: SecureFieldNewPassword,
            },
        ],
    }
)
