import { useState } from "react"
import { Accordion } from "@passui/react/accordion"
import { defineDocs } from "../types"
import { AccordionUsage } from "./examples/accordion-usage"
import { AccordionShowcase } from "./examples/accordion-showcase"
import { AccordionFaq } from "./examples/accordion-faq"
import { AccordionSettings } from "./examples/accordion-settings"

function AccordionDemo({ title }: { title: string }) {
    const [value, setValue] = useState<string | null>("details")
    return (
        <Accordion
            value={value}
            onValueChange={setValue}
            items={[
                {
                    value: "details",
                    title,
                    content: <p className="text-footnote">Details stay in context.</p>,
                },
                {
                    value: "accessibility",
                    title: "Accessibility",
                    content: (
                        <p className="text-footnote">
                            Keyboard and screen-reader support is built in.
                        </p>
                    ),
                },
            ]}
        />
    )
}

export const accordionDocs = defineDocs<{ title: string }>()({
    slug: "accordion",
    name: "Accordion",
    importPath: "@passui/react/accordion",
    controls: { title: { kind: "text", default: "Details", required: true } },
    render: (props) => <AccordionDemo {...props} />,
    childrenSnippet: () => ({
        omit: ["title"],
        imports: ['import { useState } from "react"'],
        setup: ['const [value, setValue] = useState<string | null>("details")'],
        expressionProps: {
            items: '[{ value: "details", title: "Details", content: "More information" }] ',
            value: "value",
            onValueChange: "setValue",
        },
        children: "",
    }),
    usage: AccordionUsage,
    showcase: AccordionShowcase,
    examples: [
        { id: "faq", component: AccordionFaq },
        { id: "settings", component: AccordionSettings },
    ],
})
