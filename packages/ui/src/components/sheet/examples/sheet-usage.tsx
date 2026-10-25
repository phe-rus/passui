import { Button } from "@passui/react/button"
import { Sheet } from "@passui/react/sheet"
import { useState } from "react"

export function SheetUsage() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                About this app
            </Button>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="About this app"
            >
                <div className="flex flex-col gap-2 p-6">
                    <h2 className="text-title3 font-semibold text-label">
                        Pass
                    </h2>
                    <p className="text-callout text-label-secondary">
                        Version 2.4. Made in Lisbon.
                    </p>
                </div>
            </Sheet>
        </>
    )
}
