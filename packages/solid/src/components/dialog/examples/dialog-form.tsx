import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"
import { TextField } from "@passui/solid/text-field"

export function DialogForm() {
    const [open, setOpen] = createSignal(false)
    const [name, setName] = createSignal("")
    const [saved, setSaved] = createSignal("")
    return (
        <div class="grid gap-3">
            <Button onClick={() => setOpen(true)}>
                New workspace
            </Button>
            <output>{saved() && `Created ${saved()}`}</output>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="New workspace"
                description="Give this space a name."
                footer={
                    <Dialog.Actions
                        submitLabel="Create"
                        cancelLabel="Cancel"
                        onConfirm={() => {
                            if (name().trim()) {
                                setSaved(name())
                                setOpen(false)
                            }
                        }}
                    />
                }
            >
                <TextField
                    label="Name"
                    value={name()}
                    onInput={(event) =>
                        setName(event.currentTarget.value)
                    }
                    placeholder="Design team"
                />
            </Dialog>
        </div>
    )
}
