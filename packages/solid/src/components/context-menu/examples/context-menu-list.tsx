import { createSignal } from "solid-js"
import {
    ContextMenuHost,
    openMenu,
    useContextMenu,
} from "@passui/solid/context-menu"

export function ContextMenuList() {
    const [result, setResult] = createSignal("")
    const items = () => [
        {
            label: "Open",
            onSelect: () => setResult("Opened"),
        },
        {
            label: "Duplicate",
            onSelect: () => setResult("Duplicated"),
        },
        {
            label: "Move to archive",
            onSelect: () => setResult("Archived"),
        },
    ]
    const handlers = useContextMenu(items)
    return (
        <div class="grid w-full max-w-sm gap-2">
            <button
                type="button"
                {...handlers}
                onClick={(event) =>
                    openMenu(event.currentTarget, items())
                }
                class="rounded-xl bg-fill p-4 text-left"
            >
                Project roadmap{" "}
                <span class="float-right">···</span>
            </button>
            <output class="text-footnote">{result()}</output>
            <ContextMenuHost />
        </div>
    )
}
