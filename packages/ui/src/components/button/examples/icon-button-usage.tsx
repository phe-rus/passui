import { Settings02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@passui/react/icon-button"

export function IconButtonUsage() {
    return (
        <IconButton label="Settings" variant="ghost">
            <HugeiconsIcon icon={Settings02Icon} size={20} />
        </IconButton>
    )
}
