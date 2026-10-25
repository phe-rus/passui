import { toast, useContextMenu } from "@passui/react"

export function ContextMenuUsage() {
    // render one <ContextMenuHost /> near the root of your app
    const menu = useContextMenu(() => [
        {
            label: "Copy link",
            onSelect: () => toast("Link copied"),
        },
        {
            label: "Open in new tab",
            onSelect: () => toast("Opened"),
        },
    ])

    return (
        <div
            {...menu}
            className="select-none rounded-3xl bg-fill/60 px-6 py-4 text-callout text-label"
        >
            Right-click this card
        </div>
    )
}
