import {
    Delete02Icon,
    FavouriteIcon,
    PlusSignIcon,
    Settings02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@passui/react/icon-button"

export function IconButtonVariants() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <IconButton label="Add" variant="accent">
                <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={20}
                />
            </IconButton>
            <IconButton label="Like" variant="secondary">
                <HugeiconsIcon
                    icon={FavouriteIcon}
                    size={20}
                />
            </IconButton>
            <IconButton label="Settings" variant="outline">
                <HugeiconsIcon
                    icon={Settings02Icon}
                    size={20}
                />
            </IconButton>
            <IconButton label="Delete" variant="destructive">
                <HugeiconsIcon
                    icon={Delete02Icon}
                    size={20}
                />
            </IconButton>
        </div>
    )
}
