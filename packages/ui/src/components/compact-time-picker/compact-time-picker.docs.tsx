import type { ComponentProps } from "react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { CompactTimePicker } from "./compact-time-picker"
import { CompactTimePickerShowcase } from "./examples/compact-time-picker-showcase"
import { CompactTimePickerUsage } from "./examples/compact-time-picker-usage"

type CompactTimePickerProps = ComponentProps<
    typeof CompactTimePicker
>

// Locales on 12 and 24 hour clocks, so the playground shows both.
type DemoProps = Pick<CompactTimePickerProps, "label"> & {
    locale: "en-US" | "en-GB" | "fr-FR" | "ar-EG" | "zh-CN"
}

const labels = {
    hour: "Hour",
    minute: "Minute",
    period: "AM or PM",
}

function CompactTimePickerDemo({ locale, label }: DemoProps) {
    const [time, setTime] = useState("18:30")
    return (
        <div
            className="w-full max-w-xs"
            dir={locale === "ar-EG" ? "rtl" : undefined}
        >
            <CompactTimePicker
                key={locale}
                label={label}
                labels={labels}
                locale={locale}
                value={time}
                onChange={setTime}
            />
        </div>
    )
}

export const compactTimePickerDocs = defineDocs<DemoProps>()({
    slug: "compact-time-picker",
    name: "CompactTimePicker",
    importPath: "@passui/react/compact-time-picker",
    controls: {
        label: {
            kind: "text",
            default: "Time",
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
    render: (values) => <CompactTimePickerDemo {...values} />,
    childrenSnippet: ({ locale }) => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [time, setTime] = useState("18:30")'],
        children: "",
        omit: ["locale"],
        extraProps: { locale },
        expressionProps: {
            labels: '{ hour: "Hour", minute: "Minute", period: "AM or PM" }',
            value: "time",
            onChange: "setTime",
        },
    }),
    usage: CompactTimePickerUsage,
    showcase: CompactTimePickerShowcase,
    examples: [],
})
