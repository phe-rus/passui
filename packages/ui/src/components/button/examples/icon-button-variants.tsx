import {
    TrashIcon,
    HeartIcon,
    PlusIcon,
    SettingsIcon,
} from "@passui/react/icons"
import { IconButton } from "@passui/react/icon-button"

export function IconButtonVariants() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <IconButton label="Add" variant="accent">
                <PlusIcon />
            </IconButton>
            <IconButton label="Like" variant="secondary">
                <HeartIcon />
            </IconButton>
            <IconButton label="Settings" variant="outline">
                <SettingsIcon />
            </IconButton>
            <IconButton label="Delete" variant="destructive">
                <TrashIcon />
            </IconButton>
        </div>
    )
}
