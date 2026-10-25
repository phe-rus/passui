import type { ComponentProps } from "react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { DatePicker } from "./date-picker"
import { DatePickerLocales } from "./examples/date-picker-locales"
import { DatePickerPastOnly } from "./examples/date-picker-past-only"
import { DatePickerShowcase } from "./examples/date-picker-showcase"
import { DatePickerUsage } from "./examples/date-picker-usage"

type DatePickerProps = ComponentProps<typeof DatePicker>

// A handful of locales whose field order differs, so the playground
// shows the order following the locale.
type DemoProps = Pick<DatePickerProps, "label"> & {
    locale: "en-US" | "en-GB" | "fr-FR" | "zh-CN" | "ja-JP"
}

const labels = {
    day: "Day",
    month: "Month",
    year: "Year",
    invalid: "Enter a real date.",
}

function DatePickerDemo({ locale, label }: DemoProps) {
    const [birthday, setBirthday] = useState("")
    return (
        <div className="w-full max-w-xs">
            <DatePicker
                key={locale}
                label={label}
                labels={labels}
                locale={locale}
                value={birthday}
                onChange={setBirthday}
            />
        </div>
    )
}

export const datePickerDocs = defineDocs<DemoProps>()({
    slug: "date-picker",
    name: "DatePicker",
    importPath: "@passui/react/date-picker",
    controls: {
        label: {
            kind: "text",
            default: "Birthday",
            required: true,
        },
        locale: {
            kind: "select",
            options: {
                "en-US": true,
                "en-GB": true,
                "fr-FR": true,
                "zh-CN": true,
                "ja-JP": true,
            },
            default: "en-US",
        },
    },
    render: (values) => <DatePickerDemo {...values} />,
    childrenSnippet: ({ locale }) => ({
        imports: ['import { useState } from "react"'],
        setup: [
            'const [birthday, setBirthday] = useState("")',
        ],
        children: "",
        omit: ["locale"],
        extraProps: { locale },
        expressionProps: {
            labels: '{ day: "Day", month: "Month", year: "Year", invalid: "Enter a real date." }',
            value: "birthday",
            onChange: "setBirthday",
        },
    }),
    usage: DatePickerUsage,
    showcase: DatePickerShowcase,
    examples: [
        {
            id: "locales",
            component: DatePickerLocales,
            playground: { locale: "zh-CN" },
        },
        { id: "past-only", component: DatePickerPastOnly },
    ],
})
