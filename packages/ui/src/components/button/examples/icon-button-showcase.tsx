import {
    ArrowLeft01Icon,
    Bookmark02Icon,
    MoreHorizontalIcon,
    Share08Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "@passui/react"
import { IconButton } from "@passui/react/icon-button"
import { useState } from "react"

export function IconButtonShowcase() {
    const [saved, setSaved] = useState(false)

    return (
        <article className="flex w-full max-w-sm flex-col overflow-hidden rounded-4xl bg-elevated shadow-sm ring-1 ring-separator/60">
            <header className="flex items-center justify-between p-3">
                <IconButton
                    label="Back"
                    variant="ghost"
                    size="icon-sm"
                >
                    <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        size={18}
                    />
                </IconButton>
                <div className="flex gap-1">
                    <IconButton
                        label={
                            saved
                                ? "Remove bookmark"
                                : "Bookmark"
                        }
                        variant={saved ? "accent" : "ghost"}
                        size="icon-sm"
                        onClick={() =>
                            setSaved((value) => !value)
                        }
                    >
                        <HugeiconsIcon
                            icon={Bookmark02Icon}
                            size={18}
                        />
                    </IconButton>
                    <IconButton
                        label="Share"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() =>
                            toast.success("Link copied")
                        }
                    >
                        <HugeiconsIcon
                            icon={Share08Icon}
                            size={18}
                        />
                    </IconButton>
                    <IconButton
                        label="More"
                        variant="ghost"
                        size="icon-sm"
                    >
                        <HugeiconsIcon
                            icon={MoreHorizontalIcon}
                            size={18}
                        />
                    </IconButton>
                </div>
            </header>
            <div className="h-36 bg-accent-soft" />
            <div className="flex flex-col gap-1 p-5">
                <h2 className="text-headline font-semibold text-label">
                    Designing for calm
                </h2>
                <p className="text-footnote text-label-secondary">
                    Six minutes · Saved items stay on every
                    device.
                </p>
            </div>
        </article>
    )
}
