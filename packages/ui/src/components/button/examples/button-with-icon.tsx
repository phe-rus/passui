import {
    TrashIcon,
    DownloadIcon,
    MailIcon,
} from "@passui/react/icons"
import { Button } from "@passui/react/button"

export function ButtonWithIcon() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent">
                <MailIcon size={18} />
                Email
            </Button>
            <Button variant="secondary">
                <DownloadIcon size={18} />
                Download
            </Button>
            <Button variant="destructive">
                <TrashIcon size={18} />
                Delete
            </Button>
        </div>
    )
}
