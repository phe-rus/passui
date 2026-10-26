/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
export function DialogUsage() {
    const [open, setOpen] = createSignal(false)
    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
            >
                Delete draft
            </button>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="Delete draft?"
                description="This cannot be undone."
                footer={
                    <Dialog.Actions
                        submitLabel="Delete"
                        cancelLabel="Keep draft"
                        tone="destructive"
                        onConfirm={() => setOpen(false)}
                    />
                }
            />
        </>
    )
}
