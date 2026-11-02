import { Button } from "@passui/react/button"
import { Popover } from "@passui/react/popover"
import { useDismiss } from "@passui/react/use-dismiss"
import { toast } from "@passui/react"
import { useRef, useState } from "react"

const actions = ["Duplicate", "Move to folder", "Export as PDF"]

export function PopoverMenu() {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLDivElement>(null)
    useDismiss(anchor, open, () => setOpen(false))

    return (
        <div ref={anchor} className="relative">
            <Button
                variant="secondary"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                More
            </Button>
            <Popover
                open={open}
                origin="top-right"
                role="menu"
                className="top-full right-0 mt-2 flex w-56 flex-col p-1.5"
            >
                {actions.map((action) => (
                    <Button
                        key={action}
                        type="button"
                        role="menuitem"
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                            setOpen(false)
                            toast(action)
                        }}
                    >
                        {action}
                    </Button>
                ))}
            </Popover>
        </div>
    )
}
