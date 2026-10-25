import { TooltipShortcuts } from "./examples/tooltip-shortcuts"
import { Copy01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "../button/button"
import { jsxAttribute, jsxText } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { TooltipIconButtons } from "./examples/tooltip-icon-buttons"
import { TooltipShowcase } from "./examples/tooltip-showcase"
import { TooltipUsage } from "./examples/tooltip-usage"

// The host shows a tip for any element with data-tooltip; the playground
// sets that attribute on a button.
type DemoProps = {
    tooltip: string
}

export const tooltipDocs = defineDocs<DemoProps>()({
    slug: "tooltip",
    name: "TooltipHost",
    importPath: "@passui/react",
    controls: {
        tooltip: {
            kind: "text",
            default: "Copy to clipboard",
        },
    },
    render: ({ tooltip }) => (
        <Button variant="secondary" data-tooltip={tooltip}>
            <HugeiconsIcon icon={Copy01Icon} size={18} />
            Hover me
        </Button>
    ),
    childrenSnippet: ({ tooltip }) => ({
        imports: [
            'import { Button } from "@passui/react/button"',
        ],
        element: "div",
        omit: ["tooltip"],
        children: [
            "",
            "    {/* once, near the root of your app */}",
            "    <TooltipHost />",
            `    <Button ${jsxAttribute("data-tooltip", tooltip)}>`,
            `        ${jsxText("Copy")}`,
            "    </Button>",
            "",
        ].join("\n"),
    }),
    usage: TooltipUsage,
    showcase: TooltipShowcase,
    examples: [
        { id: "icon-buttons", component: TooltipIconButtons },
        { id: "shortcuts", component: TooltipShortcuts },
    ],
    previewHeight: 200,
})
