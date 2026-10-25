import { SheetChoices } from "./examples/sheet-choices"
import { useState } from "react"
import { Button } from "../button/button"
import { defineDocs } from "../../docs/types"
import { SheetShare } from "./examples/sheet-share"
import { SheetShowcase } from "./examples/sheet-showcase"
import { SheetUsage } from "./examples/sheet-usage"
import { Sheet } from "./sheet"

type DemoProps = {
    label: string
}

function SheetDemo({ label }: DemoProps) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Open sheet
            </Button>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label={label}
            >
                <div className="flex flex-col gap-3 p-6">
                    <h2 className="text-title3 font-semibold text-label">
                        {label}
                    </h2>
                    <p className="text-callout text-label-secondary">
                        Escape, a tap outside, or the button
                        closes it.
                    </p>
                    <Button onClick={() => setOpen(false)}>
                        Done
                    </Button>
                </div>
            </Sheet>
        </>
    )
}

export const sheetDocs = defineDocs<DemoProps>()({
    slug: "sheet",
    name: "Sheet",
    importPath: "@passui/react/sheet",
    controls: {
        label: {
            kind: "text",
            default: "Details",
            required: true,
        },
    },
    render: (values) => <SheetDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ["const [open, setOpen] = useState(false)"],
        expressionProps: {
            open: "open",
            onClose: "() => setOpen(false)",
        },
        children:
            '\n    <div className="p-6">The sheet\'s content</div>\n',
    }),
    usage: SheetUsage,
    showcase: SheetShowcase,
    examples: [
        { id: "share", component: SheetShare },
        { id: "choices", component: SheetChoices },
    ],
    previewHeight: 420,
})
