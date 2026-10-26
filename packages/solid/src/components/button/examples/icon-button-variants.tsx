import { IconButton } from "@passui/solid/icon-button"
import {
    Delete02Icon,
    FavouriteIcon,
    PlusSignIcon,
    Settings02Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function IconButtonVariants() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <IconButton label="Add" variant="accent">
                <Hugeicon icon={PlusSignIcon} size={20} />
            </IconButton>
            <IconButton label="Like" variant="secondary">
                <Hugeicon icon={FavouriteIcon} size={20} />
            </IconButton>
            <IconButton label="Settings" variant="outline">
                <Hugeicon icon={Settings02Icon} size={20} />
            </IconButton>
            <IconButton label="Delete" variant="destructive">
                <Hugeicon icon={Delete02Icon} size={20} />
            </IconButton>
        </div>
    )
}
