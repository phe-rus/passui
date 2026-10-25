import {
    Delete02Icon,
    Download04Icon,
    Mail01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@passui/react/button"

export function ButtonWithIcon() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent">
                <HugeiconsIcon icon={Mail01Icon} size={18} />
                Email
            </Button>
            <Button variant="secondary">
                <HugeiconsIcon
                    icon={Download04Icon}
                    size={18}
                />
                Download
            </Button>
            <Button variant="destructive">
                <HugeiconsIcon
                    icon={Delete02Icon}
                    size={18}
                />
                Delete
            </Button>
        </div>
    )
}
