import { useState } from "react"
import { InlineDisclosure } from "@passui/react/inline-disclosure"

export function InlineDisclosureDetails() {
    const [open, setOpen] = useState(true)
    return (
        <div className="w-full max-w-sm">
            <button
                type="button"
                aria-expanded={open}
                className="w-full rounded-2xl bg-fill p-4 text-left text-body"
                onClick={() => setOpen((value) => !value)}
            >
                More details
            </button>
            <InlineDisclosure open={open}>
                <div className="space-y-2 p-4 text-subheadline text-label-secondary">
                    <p>
                        Additional information stays in the
                        document flow.
                    </p>
                    <p>
                        Following content moves with the
                        disclosure.
                    </p>
                </div>
            </InlineDisclosure>
        </div>
    )
}
