import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"
export function DialogUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Sign out
            </Button>
            <Dialog
                open={open()}
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
