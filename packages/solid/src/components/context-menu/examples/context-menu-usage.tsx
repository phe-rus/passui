import {
    ContextMenuHost,
    useContextMenu,
} from "@passui/solid/context-menu"
import { toast } from "@passui/solid/toast"
export function ContextMenuUsage() {
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
        <>
            <div
                {...menu}
                class="select-none rounded-3xl bg-fill/60 px-6 py-4 text-callout text-label"
            >
                Right-click this card
            </div>
            <ContextMenuHost />
        </>
    )
}
