import { OneTimeCode } from "@passui/react/one-time-code"
import { useState } from "react"
import type { OneTimeCodeProps } from "@passui/react/one-time-code"
import { defineDocs } from "../types"
import { OneTimeCodeUsage } from "./examples/one-time-code-usage"
import { OneTimeCodeShowcase } from "./examples/one-time-code-showcase"
import { OneTimeCodeFourDigits } from "./examples/one-time-code-four-digits"
import { OneTimeCodeDisabled } from "./examples/one-time-code-disabled"
import { OneTimeCodeDeviceCode } from "./examples/one-time-code-device-code"
function Demo(props: Pick<OneTimeCodeProps, "label" | "length" | "status" | "format">) {
    const [value, setValue] = useState("")
    return (
        <div className="w-full max-w-xs">
            <OneTimeCode {...props} value={value} onChange={setValue} />
        </div>
    )
}
export const oneTimeCodeDocs = defineDocs<
    Pick<OneTimeCodeProps, "label" | "length" | "status" | "format">
>()({
    slug: "one-time-code",
    name: "OneTimeCode",
    importPath: "@passui/react/one-time-code",
    controls: {
        label: { kind: "text", default: "Verification code", required: true },
        length: { kind: "number", default: 6, min: 3, max: 8, step: 1 },
        format: {
            kind: "select",
            default: "numeric",
            options: { numeric: true, alphanumeric: true },
        },
        status: {
            kind: "select",
            default: "idle",
            options: { idle: true, verifying: true, success: true, error: true },
        },
    },
    render: (props) => <Demo {...props} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [value, setValue] = useState("")'],
        expressionProps: { value: "value", onChange: "setValue" },
        children: "",
    }),
    usage: OneTimeCodeUsage,
    showcase: OneTimeCodeShowcase,
    examples: [
        { id: "device-code", component: OneTimeCodeDeviceCode },
        { id: "four-digits", component: OneTimeCodeFourDigits },
        { id: "disabled", component: OneTimeCodeDisabled },
    ],
})
