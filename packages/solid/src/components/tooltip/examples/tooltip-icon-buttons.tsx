import { TooltipHost } from "@passui/solid/tooltip"
import { IconButton } from "@passui/solid/icon-button"
import {
    Copy01Icon,
    Delete02Icon,
    Share08Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function TooltipIconButtons() {
    return (
        <div class="flex gap-2">
            <IconButton label="Copy" variant="secondary">
                <Hugeicon icon={Copy01Icon} size={20} />
            </IconButton>
            <IconButton label="Share" variant="secondary">
                <Hugeicon icon={Share08Icon} size={20} />
            </IconButton>
            <IconButton label="Delete" variant="secondary">
                <Hugeicon icon={Delete02Icon} size={20} />
            </IconButton>
            <TooltipHost />
        </div>
    )
}
