import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"

export function DialogInline() {
    const [open, setOpen] = createSignal(false)
    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                View details
            </Button>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="Project details"
                description="A private workspace for your team."
                footer={
                    <Dialog.Actions
                        submitLabel="Done"
                        cancelLabel="Close"
                        onConfirm={() => setOpen(false)}
                    />
                }
            >
                <p class="text-footnote">
                    Created October 2026 · 4 collaborators
                </p>
            </Dialog>
        </>
    )
}
