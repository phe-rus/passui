import { Button } from "@passui/react/button"
import { Popover } from "@passui/react/popover"
import { useDismiss } from "@passui/react/use-dismiss"
import { useRef, useState } from "react"

export function PopoverUsage() {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLDivElement>(null)
    const trigger = useRef<HTMLButtonElement>(null)
    useDismiss(anchor, open, () => setOpen(false))

    return (
        <div ref={anchor} className="relative">
            <Button
                ref={trigger}
                variant="secondary"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                What's this?
            </Button>
            <Popover open={open} anchorRef={trigger} className="top-full left-0 mt-2 w-64 p-4">
                <p className="text-callout text-label">
                    A passkey signs you in with your face, fingerprint or screen lock.
                </p>
            </Popover>
        </div>
    )
}
