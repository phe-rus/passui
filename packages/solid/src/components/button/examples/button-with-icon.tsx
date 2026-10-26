import { Button } from "@passui/solid/button"
import {
    Delete02Icon,
    Download04Icon,
    Mail01Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function ButtonWithIcon() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent">
                <Hugeicon icon={Mail01Icon} size={18} /> Email
            </Button>
            <Button variant="secondary">
                <Hugeicon icon={Download04Icon} size={18} />{" "}
                Download
            </Button>
            <Button variant="destructive">
                <Hugeicon icon={Delete02Icon} size={18} />{" "}
                Delete
            </Button>
        </div>
    )
}
