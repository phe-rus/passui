import {
    CopyIcon,
    ShareIcon,
    TrashIcon,
} from "@passui/react/icons"
import { IconButton } from "@passui/react/icon-button"

export function TooltipIconButtons() {
    // IconButton shows its label as a tooltip by itself
    return (
        <div className="flex gap-2">
            <IconButton label="Copy" variant="secondary">
                <CopyIcon />
            </IconButton>
            <IconButton label="Share" variant="secondary">
                <ShareIcon />
            </IconButton>
            <IconButton label="Delete" variant="secondary">
                <TrashIcon />
            </IconButton>
        </div>
    )
}
