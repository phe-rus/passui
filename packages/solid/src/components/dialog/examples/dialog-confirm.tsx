import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"
import { toast } from "@passui/solid/toast"

export function DialogConfirm() {
    const [open, setOpen] = createSignal(false)
    return (
        <>
            <Button
                variant="destructive"
                onClick={() => setOpen(true)}
            >
                Delete app
            </Button>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="Delete this app?"
                description="People signed in with it will be signed out."
                footer={
                    <Dialog.Actions
                        tone="destructive"
                        submitLabel="Delete"
                        cancelLabel="Cancel"
                        onConfirm={() => {
                            setOpen(false)
                            toast.success("App deleted")
                        }}
                    />
                }
            />
        </>
    )
}
