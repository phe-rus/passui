import { useState } from "react"
import { InlineDisclosure } from "@passui/react/inline-disclosure"

export function InlineDisclosureSettings() {
    const [open, setOpen] = useState(false)
    return (
        <div className="w-full max-w-sm">
            <button
                type="button"
                aria-expanded={open}
                className="w-full rounded-2xl bg-fill p-4 text-left text-body"
                onClick={() => setOpen((value) => !value)}
            >
                Account settings
            </button>
            <InlineDisclosure open={open}>
                <p className="p-4 text-subheadline text-label-secondary">
                    The following content settles into place
                    with a spring.
                </p>
            </InlineDisclosure>
        </div>
    )
}
