import {
    Copy01Icon,
    Delete02Icon,
    Share08Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@passui/react/icon-button"

export function TooltipIconButtons() {
    // IconButton shows its label as a tooltip by itself
    return (
        <div className="flex gap-2">
            <IconButton label="Copy" variant="secondary">
                <HugeiconsIcon icon={Copy01Icon} size={20} />
            </IconButton>
            <IconButton label="Share" variant="secondary">
                <HugeiconsIcon icon={Share08Icon} size={20} />
            </IconButton>
            <IconButton label="Delete" variant="secondary">
                <HugeiconsIcon
                    icon={Delete02Icon}
                    size={20}
                />
            </IconButton>
        </div>
    )
}
