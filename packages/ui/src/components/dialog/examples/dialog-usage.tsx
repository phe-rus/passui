import { Button } from "@passui/react/button"
import { Dialog } from "@passui/react/dialog"
import { useState } from "react"

export function DialogUsage() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Sign out
            </Button>
            <Dialog
                open={open}
                onOpenChange={setOpen}
                title="Sign out of Pass?"
                description="You can sign back in at any time."
                footer={
                    <Dialog.Actions
                        submitLabel="Sign out"
                        cancelLabel="Cancel"
                        onConfirm={() => setOpen(false)}
                    />
                }
            />
        </>
    )
}
