import { IconButton } from "@passui/solid/icon-button"
import { Settings02Icon } from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function IconButtonUsage() {
    return (
        <IconButton label="Settings" variant="ghost">
            <Hugeicon icon={Settings02Icon} size={20} />
        </IconButton>
    )
}
