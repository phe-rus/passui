import type { ComponentProps } from "react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { CompactDatePicker } from "./compact-date-picker"
import { CompactDatePickerShowcase } from "./examples/compact-date-picker-showcase"
import { CompactDatePickerUsage } from "./examples/compact-date-picker-usage"

type CompactDatePickerProps = ComponentProps<
    typeof CompactDatePicker
>

// Locales whose weeks start on different days, so the playground shows it.
type DemoProps = Pick<CompactDatePickerProps, "label"> & {
    locale: "en-US" | "en-GB" | "fr-FR" | "ar-EG" | "zh-CN"
}

const labels = {
    previousMonth: "Previous month",
    nextMonth: "Next month",
    clear: "Remove date",
}

function CompactDatePickerDemo({ locale, label }: DemoProps) {
    const [date, setDate] = useState("")
    return (
        <div
            className="w-full max-w-xs"
            dir={locale === "ar-EG" ? "rtl" : undefined}
        >
            <CompactDatePicker
                key={locale}
                label={label}
                labels={labels}
                locale={locale}
                placeholder="None"
                value={date}
                onChange={setDate}
            />
        </div>
    )
}

export const compactDatePickerDocs = defineDocs<DemoProps>()({
    slug: "compact-date-picker",
    name: "CompactDatePicker",
    importPath: "@passui/react/compact-date-picker",
    controls: {
        label: {
            kind: "text",
            default: "Starts",
            required: true,
        },
        locale: {
            kind: "select",
            options: {
                "en-US": true,
                "en-GB": true,
                "fr-FR": true,
                "ar-EG": true,
                "zh-CN": true,
            },
            default: "en-US",
        },
    },
    render: (values) => <CompactDatePickerDemo {...values} />,
    childrenSnippet: ({ locale }) => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [date, setDate] = useState("")'],
        children: "",
        omit: ["locale"],
        extraProps: { locale },
        expressionProps: {
            labels: '{ previousMonth: "Previous month", nextMonth: "Next month", clear: "Remove date" }',
            value: "date",
            onChange: "setDate",
        },
    }),
    usage: CompactDatePickerUsage,
    showcase: CompactDatePickerShowcase,
    examples: [],
})
