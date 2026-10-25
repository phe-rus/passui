import {
    Archive01Icon,
    Delete02Icon,
    MailReply01Icon,
    StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@passui/react/icon-button"

const actions = [
    { label: "Reply", icon: MailReply01Icon },
    { label: "Star", icon: StarIcon },
    { label: "Archive", icon: Archive01Icon },
    { label: "Delete", icon: Delete02Icon },
]

export function TooltipShowcase() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <div className="flex items-center justify-between">
                <span className="text-headline font-semibold text-label">
                    Inbox
                </span>
                <div className="flex gap-1">
                    {actions.map((action) => (
                        <IconButton
                            key={action.label}
                            label={action.label}
                            variant="ghost"
                        >
                            <HugeiconsIcon
                                icon={action.icon}
                                size={20}
                            />
                        </IconButton>
                    ))}
                </div>
            </div>
            <p className="m-0 text-callout text-label-secondary">
                Hover an icon to see what it does.
            </p>
        </div>
    )
}
