import { IconButton } from "@passui/solid/icon-button"
import { toast } from "@passui/solid/toast"
import {
    ContextMenuHost,
    openMenu,
} from "@passui/solid/context-menu"

export function ContextMenuToolbar() {
    let toolbar: HTMLDivElement | undefined
    return (
        <div ref={toolbar} class="flex items-center gap-1">
            <IconButton
                label="Favourite"
                variant="ghost"
                size="icon-xs"
            >
                <span aria-hidden="true">☆</span>
            </IconButton>
            <IconButton
                label="Share"
                variant="ghost"
                size="icon-xs"
            >
                <span aria-hidden="true">↗</span>
            </IconButton>
            <IconButton
                label="More"
                variant="ghost"
                size="icon-xs"
                onClick={(event) =>
                    openMenu(
                        event.currentTarget,
                        [
                            {
                                label: "Duplicate",
                                onSelect: () =>
                                    toast("Duplicated"),
                            },
                            {
                                label: "Move",
                                onSelect: () =>
                                    toast("Choose a folder"),
                            },
                        ],
                        { edge: "trailing", toolbar }
                    )
                }
            >
                <span aria-hidden="true">···</span>
            </IconButton>
            <ContextMenuHost />
        </div>
    )
}
