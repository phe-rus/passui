import { createSignal, onCleanup } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { Button } from "@passui/solid/button"
import { Dialog } from "@passui/solid/dialog"
import { toast } from "@passui/solid/toast"

export function DialogShowcase() {
    const [open, setOpen] = createSignal(false)
    const [pending, setPending] = createSignal(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    onCleanup(() => clearTimeout(timer))
    return (
        <div class="w-full max-w-sm">
            <Section title="Devices">
                <LabeledContent
                    label="iPad mini"
                    description="Last used 3 weeks ago"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        class="text-danger"
                        onClick={() => setOpen(true)}
                    >
                        Sign out
                    </Button>
                </LabeledContent>
            </Section>
            <Dialog
                open={open()}
                onOpenChange={setOpen}
                title="Sign out of iPad mini?"
                description="It will need your password or a passkey to sign back in."
                footer={
                    <Dialog.Actions
                        submitLabel="Sign out"
                        cancelLabel="Cancel"
                        tone="destructive"
                        pending={pending()}
                        onConfirm={() => {
                            setPending(true)
                            timer = setTimeout(() => {
                                setPending(false)
                                setOpen(false)
                                toast.success(
                                    "Signed out of iPad mini"
                                )
                            }, 900)
                        }}
                    />
                }
            />
        </div>
    )
}
