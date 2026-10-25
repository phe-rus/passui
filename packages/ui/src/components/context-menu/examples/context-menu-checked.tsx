import { useContextMenu } from "@passui/react"
import { useState } from "react"

const orders = {
    recent: "Recently edited",
    title: "Title",
    created: "Date created",
}

type Order = keyof typeof orders

export function ContextMenuChecked() {
    const [order, setOrder] = useState<Order>("recent")
    const menu = useContextMenu(() => [
        { heading: "Sort by" },
        ...(Object.keys(orders) as Order[]).map((key) => ({
            label: orders[key],
            checked: key === order,
            onSelect: () => setOrder(key),
        })),
    ])

    return (
        <div
            {...menu}
            className="flex w-64 select-none flex-col items-center gap-1 rounded-4xl bg-elevated p-6 text-center shadow-sm ring-1 ring-separator/60"
        >
            <span className="text-subheadline font-medium text-label">
                Notes
            </span>
            <span className="text-footnote text-label-secondary">
                Sorted by {orders[order].toLowerCase()}.
                Right-click to change.
            </span>
        </div>
    )
}
