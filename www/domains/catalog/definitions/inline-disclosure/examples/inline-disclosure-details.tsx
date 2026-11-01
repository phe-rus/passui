import { useState } from "react"
import { InlineDisclosure } from "@passui/react/inline-disclosure"
import { Button } from "@passui/react/button"

export function InlineDisclosureDetails() {
    const [open, setOpen] = useState(true)
    return (
        <div className="w-full max-w-sm">
            <Button
                type="button"
                variant="secondary"
                aria-expanded={open}
                className="w-full justify-start"
                onClick={() => setOpen((value) => !value)}
            >
                More details
            </Button>
            <InlineDisclosure open={open}>
                <div className="flex flex-col gap-2 p-4">
                    <p>Additional information stays in the document flow.</p>
                    <p>Following content moves with the disclosure.</p>
                </div>
            </InlineDisclosure>
        </div>
    )
}
