import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@passui/react/icon-button"
import { Popover } from "@passui/react/popover"
import { TextField } from "@passui/react/text-field"
import { useDismiss } from "@passui/react/use-dismiss"
import { useRef, useState } from "react"

export function PopoverHelp() {
    const [open, setOpen] = useState(false)
    const [uri, setUri] = useState(
        "https://app.example.com/callback"
    )
    const anchor = useRef<HTMLDivElement>(null)
    useDismiss(anchor, open, () => setOpen(false))

    return (
        <div className="flex h-72 w-full max-w-sm flex-col gap-2">
            <TextField
                label="Redirect URI"
                value={uri}
                onChange={(event) =>
                    setUri(event.target.value)
                }
                action={
                    <div ref={anchor} className="relative">
                        <IconButton
                            label="What's a redirect URI?"
                            size="icon-xs"
                            variant="ghost"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                        >
                            <HugeiconsIcon
                                icon={InformationCircleIcon}
                                size={18}
                            />
                        </IconButton>
                        <Popover
                            open={open}
                            origin="top-right"
                            role="dialog"
                            aria-label="Redirect URI"
                            className="top-full right-0 mt-2 w-64 p-4"
                        >
                            <p className="text-footnote text-label">
                                Where Pass sends people back
                                after they sign in. It must
                                match your app exactly.
                            </p>
                        </Popover>
                    </div>
                }
            />
        </div>
    )
}
