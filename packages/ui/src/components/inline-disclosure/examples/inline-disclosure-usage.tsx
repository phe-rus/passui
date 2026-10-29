import { useState } from "react"
import { Button } from "@passui/react/button"
import { InlineDisclosure } from "@passui/react/inline-disclosure"

export function InlineDisclosureUsage() {
    const [open, setOpen] = useState(false)
    return (
        <div className="w-full max-w-sm">
            <Button variant="secondary" onClick={() => setOpen(value => !value)} aria-expanded={open}>Edit details</Button>
            <InlineDisclosure open={open}>
                <p className="pt-3 text-subheadline text-label-secondary">Settings appear smoothly beneath the row.</p>
            </InlineDisclosure>
        </div>
    )
}
