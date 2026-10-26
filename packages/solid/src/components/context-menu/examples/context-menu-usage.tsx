import {
    ContextMenuHost,
    openMenu,
    useContextMenu,
} from "@passui/solid/context-menu"
import { createSignal } from "solid-js"
export function ContextMenuUsage() {
    const [selected, setSelected] = createSignal("")
    const items = () => [
        {
            label: "Duplicate",
            onSelect: () => setSelected("Duplicated"),
        },
        {
            label: "Archive",
            onSelect: () => setSelected("Archived"),
        },
    ]
    const handlers = useContextMenu(items)
    return (
        <>
            <button
                type="button"
                {...handlers}
                onClick={(event) =>
                    openMenu(event.currentTarget, items())
                }
            >
                Open actions
            </button>
            <output>{selected()}</output>
            <ContextMenuHost />
        </>
    )
}
