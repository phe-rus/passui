import { useState } from "react"
import { DisclosureGroup } from "@passui/react/disclosure-group"

export function DisclosureGroupSettings() {
    const [open, setOpen] = useState(false)
    return (
        <DisclosureGroup
            label="Advanced"
            description="Optional settings"
            open={open}
            onOpenChange={setOpen}
        >
            <p className="text-footnote text-label-secondary">
                These settings are available when needed.
            </p>
        </DisclosureGroup>
    )
}
