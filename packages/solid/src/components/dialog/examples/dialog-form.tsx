import { createSignal } from "solid-js"
import { Dialog } from "@passui/solid/dialog"
import { Button } from "@passui/solid/button"
import { TextField } from "@passui/solid/text-field"
import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"

export function DialogForm() {
    const [open, setOpen] = createSignal(false)
    const [name, setName] = createSignal("Pass console")
    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Rename project
            </Button>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="Rename project"
                onSubmit={(event) => {
                    event.preventDefault()
                    setOpen(false)
                    toast.success(`Renamed to ${name()}`)
                }}
                footer={
                    <Dialog.Actions
                        submitLabel="Rename"
                        cancelLabel="Cancel"
                        disabled={!name().trim()}
                    />
                }
            >
                <TextField
                    label="Name"
                    value={name()}
                    onInput={(event) =>
                        setName(event.currentTarget.value)
                    }
                />
            </Dialog>
            <Toaster />
        </>
    )
}
