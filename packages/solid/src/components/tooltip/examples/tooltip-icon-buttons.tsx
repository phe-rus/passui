import { TooltipHost } from "@passui/solid/tooltip"
import { IconButton } from "@passui/solid/icon-button"

export function TooltipIconButtons() {
    return (
        <div class="flex gap-2">
            <IconButton label="Copy" variant="secondary">
                <span aria-hidden="true">⧉</span>
            </IconButton>
            <IconButton label="Share" variant="secondary">
                <span aria-hidden="true">↗</span>
            </IconButton>
            <IconButton label="Delete" variant="secondary">
                <span aria-hidden="true">▤</span>
            </IconButton>
            <TooltipHost />
        </div>
    )
}
