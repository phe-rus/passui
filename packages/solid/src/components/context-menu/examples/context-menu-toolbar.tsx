import { createSignal } from "solid-js"
import {
    ContextMenuHost,
    openMenu,
    useContextMenu,
} from "@passui/solid/context-menu"

export function ContextMenuToolbar() {
    const [result, setResult] = createSignal("")
    const items = () => [
        {
            label: "Copy",
            onSelect: () => setResult("Copied"),
        },
        {
            label: "Rename",
            onSelect: () => setResult("Renamed"),
        },
        {
            label: "Share",
            onSelect: () => setResult("Shared"),
        },
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
                File actions ···
            </button>
            <output class="text-footnote">{result()}</output>
            <ContextMenuHost />
        </div>
    )
}
