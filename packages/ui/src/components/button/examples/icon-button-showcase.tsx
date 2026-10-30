import {
    ChevronLeftIcon,
    BookmarkIcon,
    MoreIcon,
    ShareIcon,
} from "@passui/react/icons"
import { toast } from "@passui/react"
import { IconButton } from "@passui/react/icon-button"
import { copyText } from "@passui/react/clipboard"
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
                    <ChevronLeftIcon size={18} />
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
                        <BookmarkIcon size={18} />
                    </IconButton>
                    <IconButton
                        label="Copy link"
                        variant="ghost"
                        size="icon-sm"
                        onClick={async () => {
                            if (
                                await copyText(
                                    window.location.href
                                )
                            )
                                toast.success("Link copied")
                            else
                                toast.error(
                                    "Could not copy the link"
                                )
                        }}
                    >
                        <ShareIcon size={18} />
                    </IconButton>
                    <IconButton
                        label="More"
                        variant="ghost"
                        size="icon-sm"
                    >
                        <MoreIcon size={18} />
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
