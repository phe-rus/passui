import { LabeledContent, Section, toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { Dialog } from "@passui/react/dialog"
import { useState } from "react"

export function DialogShowcase() {
    const [open, setOpen] = useState(false)
    const [pending, setPending] = useState(false)

    return (
        <div className="w-full max-w-sm">
            <Section title="Devices">
                <LabeledContent
                    label="iPad mini"
                    description="Last used 3 weeks ago"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-danger"
                        onClick={() => setOpen(true)}
                    >
                        Sign out
                    </Button>
                </LabeledContent>
            </Section>
            <Dialog
                open={open}
                onOpenChange={setOpen}
                title="Sign out of iPad mini?"
                description="It will need your password or a passkey to sign back in."
                footer={
                    <Dialog.Actions
                        submitLabel="Sign out"
                        cancelLabel="Cancel"
                        tone="destructive"
                        pending={pending}
                        onConfirm={() => {
                            setPending(true)
                            setTimeout(() => {
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
