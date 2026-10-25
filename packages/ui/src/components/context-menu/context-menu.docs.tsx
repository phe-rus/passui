import { ContextMenuToolbar } from "./examples/context-menu-toolbar"
import { ContextMenuChecked } from "./examples/context-menu-checked"
import { toast } from "../toast/toast-store"
import { defineDocs } from "../../docs/types"
import type { ContextMenuItem } from "./context-menu-store"
import { ContextMenuList } from "./examples/context-menu-list"
import { ContextMenuShowcase } from "./examples/context-menu-showcase"
import { ContextMenuUsage } from "./examples/context-menu-usage"
import { useContextMenu } from "./use-context-menu"

// useContextMenu is a hook: the playground spreads its handlers on a
// card, and the switches change the menu's rows.
type DemoProps = {
    heading: boolean
    destructive: boolean
}

function items({
    heading,
    destructive,
}: DemoProps): ContextMenuItem[] {
    return [
        ...(heading ? [{ heading: "Photo" }] : []),
        { label: "Copy", onSelect: () => toast("Copied") },
        { label: "Share", onSelect: () => toast("Shared") },
        ...(destructive
            ? [
                  "divider" as const,
                  {
                      label: "Delete",
                      destructive: true,
                      onSelect: () => toast("Deleted"),
                  },
              ]
            : []),
    ]
}

function ContextMenuDemo(props: DemoProps) {
    const menu = useContextMenu(() => items(props))
    return (
        <div
            {...menu}
            className="flex h-36 w-64 select-none items-center justify-center rounded-4xl bg-fill/60 p-6 text-center text-callout text-label-secondary"
        >
            Right-click, or press and hold on a touch screen
        </div>
    )
}

export const contextMenuDocs = defineDocs<DemoProps>()({
    slug: "context-menu",
    name: "useContextMenu",
    importPath: "@passui/react",
    controls: {
        heading: { kind: "boolean", default: false },
        destructive: { kind: "boolean", default: true },
    },
    render: (values) => <ContextMenuDemo {...values} />,
    childrenSnippet: ({ heading, destructive }) => ({
        imports: ['import { toast } from "@passui/react"'],
        element: "div",
        omit: ["heading", "destructive"],
        setup: [
            "const menu = useContextMenu(() => [",
            ...(heading ? ['    { heading: "Photo" },'] : []),
            '    { label: "Copy", onSelect: () => toast("Copied") },',
            '    { label: "Share", onSelect: () => toast("Shared") },',
            ...(destructive
                ? [
                      '    "divider",',
                      '    { label: "Delete", destructive: true, onSelect: () => toast("Deleted") },',
                  ]
                : []),
            "])",
        ],
        spreadProps: ["menu"],
        children: "\n    Right-click me\n",
    }),
    usage: ContextMenuUsage,
    showcase: ContextMenuShowcase,
    examples: [
        { id: "toolbar", component: ContextMenuToolbar },
        {
            id: "list",
            component: ContextMenuList,
            playground: { heading: true },
        },
        { id: "checked", component: ContextMenuChecked },
    ],
    previewHeight: 360,
})
