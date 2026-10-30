import { useRef } from "react"
import { IconButton } from "@passui/react/icon-button"
import {
    MoreIcon,
    ShareIcon,
    StarIcon,
} from "@passui/react/icons"
import { openMenu, toast } from "@passui/react"

export function ContextMenuToolbar() {
    const toolbar = useRef<HTMLDivElement>(null)
    return (
        <div
            ref={toolbar}
            className="flex items-center gap-1"
        >
            <IconButton
                label="Favourite"
                variant="ghost"
                size="icon-xs"
            >
                <StarIcon size={18} />
            </IconButton>
            <IconButton
                label="Share"
                variant="ghost"
                size="icon-xs"
            >
                <ShareIcon size={18} />
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
                        {
                            edge: "trailing",
                            toolbar:
                                toolbar.current ?? undefined,
                        }
                    )
                }
            >
                <MoreIcon size={18} />
            </IconButton>
        </div>
    )
}
