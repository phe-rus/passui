import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"
import { TextField } from "@passui/solid/text-field"

export function DialogInline() {
    const [open, setOpen] = createSignal(false)
    const [email, setEmail] = createSignal("")
    return (
        <div class="flex w-full max-w-sm flex-col gap-2 rounded-4xl bg-elevated p-2 ring-1 ring-separator/60">
            <Button
                variant="ghost"
                class="self-start"
                onClick={() => setOpen(!open())}
            >
                {open() ? "Cancel" : "Add a recovery email"}
            </Button>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                presentation="inline"
                title="Recovery email"
                description="We only use it if you lose access."
                onSubmit={(event) => {
                    event.preventDefault()
                    setOpen(false)
                }}
                footer={
                    <Dialog.Actions
                        submitLabel="Add"
                        cancelLabel="Cancel"
                        disabled={!email()}
                    />
                }
            >
                <TextField
                    label="Email"
                    type="email"
                    value={email()}
                    onInput={(event) =>
                        setEmail(event.currentTarget.value)
                    }
                />
            </Dialog>
        </div>
    )
}
