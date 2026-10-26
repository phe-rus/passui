import { createSignal } from "solid-js"
import {
    ContextMenuHost,
    openMenu,
    useContextMenu,
} from "@passui/solid/context-menu"

export function ContextMenuChecked() {
    const [pinned, setPinned] = createSignal(false)
    const items = () => [
        {
            label: pinned() ? "Unpin" : "Pin",
            onSelect: () => setPinned(!pinned()),
        },
        { label: "Details", onSelect: () => {} },
    ]
    const handlers = useContextMenu(items)
    return (
        <div class="grid gap-2">
            <button
                type="button"
                {...handlers}
                onClick={(event) =>
                    openMenu(event.currentTarget, items())
                }
                class="rounded-xl bg-fill p-3"
            >
                Project ···
            </button>
            <output class="text-footnote">
                {pinned() ? "Pinned to top" : "Not pinned"}
            </output>
            <ContextMenuHost />
        </div>
    )
}
