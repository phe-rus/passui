import { IconButton } from "@passui/solid/icon-button"

export function IconButtonVariants() {
    return (
        <div class="flex items-center gap-3">
            <IconButton label="Add" variant="default">
                <span aria-hidden="true">＋</span>
            </IconButton>
            <IconButton label="Favorite" variant="secondary">
                <span aria-hidden="true">♡</span>
            </IconButton>
            <IconButton label="More options" variant="ghost">
                <span aria-hidden="true">···</span>
            </IconButton>
        </div>
    )
}
