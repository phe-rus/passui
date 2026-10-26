import { IconButton } from "@passui/solid/icon-button"

export function IconButtonVariants() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <IconButton label="Add" variant="accent">
                <span aria-hidden="true">＋</span>
            </IconButton>
            <IconButton label="Like" variant="secondary">
                <span aria-hidden="true">♡</span>
            </IconButton>
            <IconButton label="Settings" variant="outline">
                <span aria-hidden="true">⚙</span>
            </IconButton>
            <IconButton label="Delete" variant="destructive">
                <span aria-hidden="true">♲</span>
            </IconButton>
        </div>
    )
}
