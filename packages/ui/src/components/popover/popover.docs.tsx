import { PopoverHelp } from "./examples/popover-help"
import { useRef, useState } from "react"
import { Button } from "../button/button"
import { defineDocs } from "../../docs/types"
import { useDismiss } from "../../hooks/use-dismiss"
import { PopoverMenu } from "./examples/popover-menu"
import { PopoverShowcase } from "./examples/popover-showcase"
import { PopoverUsage } from "./examples/popover-usage"
import { Popover, type PopoverProps } from "./popover"

type DemoProps = Pick<PopoverProps, "origin">

function PopoverDemo({ origin }: DemoProps) {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLDivElement>(null)
    useDismiss(anchor, open, () => setOpen(false))
    return (
        <div ref={anchor} className="relative">
            <Button
                variant="secondary"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                Open popover
            </Button>
            <Popover
                open={open}
                origin={origin}
                className={
                    origin === "top-right"
                        ? "top-full right-0 mt-2 w-60 p-4"
                        : "top-full left-0 mt-2 w-60 p-4"
                }
            >
                <p className="text-callout text-label">
                    Grows from its {origin ?? "top-left"}{" "}
                    corner. Escape or a click outside closes
                    it.
                </p>
            </Popover>
        </div>
    )
}

export const popoverDocs = defineDocs<PopoverProps>()({
    slug: "popover",
    name: "Popover",
    importPath: "@passui/react/popover",
    controls: {
        origin: {
            kind: "select",
            options: { "top-left": true, "top-right": true },
            default: "top-left",
        },
    },
    render: (values) => <PopoverDemo {...values} />,
    childrenSnippet: ({ origin }) => ({
        imports: [
            'import { useRef, useState } from "react"',
            'import { useDismiss } from "@passui/react/use-dismiss"',
        ],
        setup: [
            "const [open, setOpen] = useState(false)",
            "const anchor = useRef<HTMLDivElement>(null)",
            "useDismiss(anchor, open, () => setOpen(false))",
        ],
        expressionProps: { open: "open" },
        extraProps: {
            className:
                origin === "top-right"
                    ? "top-full right-0 mt-2 w-60 p-4"
                    : "top-full left-0 mt-2 w-60 p-4",
        },
        children:
            "\n    {/* inside a relative parent with ref={anchor} */}\n",
    }),
    usage: PopoverUsage,
    showcase: PopoverShowcase,
    examples: [
        { id: "menu", component: PopoverMenu },
        { id: "help", component: PopoverHelp },
    ],
    previewHeight: 320,
})
