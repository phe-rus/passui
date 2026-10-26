import { TooltipHost } from "@passui/solid/tooltip"
import { IconButton } from "@passui/solid/icon-button"

export function TooltipIconButtons() {
    return (
        <div class="flex items-center gap-3">
            <span data-tooltip="Add an item">
                <IconButton label="Add item">
                    <span aria-hidden="true">＋</span>
                </IconButton>
            </span>
            <span data-tooltip="Favorite">
                <IconButton label="Favorite">
                    <span aria-hidden="true">♡</span>
                </IconButton>
            </span>
            <span data-tooltip="More actions">
                <IconButton label="More actions">
                    <span aria-hidden="true">···</span>
                </IconButton>
            </span>
            <TooltipHost />
        </div>
    )
}
