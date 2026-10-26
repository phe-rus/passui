import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"

export function DialogConfirm() {
    const [open, setOpen] = createSignal(false)
    const [deleted, setDeleted] = createSignal(false)
    return (
        <div class="grid gap-2">
            <Button
                variant="destructive"
                onClick={() => setOpen(true)}
            >
                Delete project
            </Button>
            <output>
                {deleted() ? "Project deleted" : ""}
            </output>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="Delete this project?"
                description="This action can't be undone."
                footer={
                    <Dialog.Actions
                        tone="destructive"
                        submitLabel="Delete"
                        cancelLabel="Cancel"
                        onConfirm={() => {
                            setDeleted(true)
                            setOpen(false)
                        }}
                    />
                }
            />
        </div>
    )
}
