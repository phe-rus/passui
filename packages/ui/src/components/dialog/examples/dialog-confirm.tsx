import { confirmDialog, toast } from "@passui/react"
import { Button } from "@passui/react/button"

export function DialogConfirm() {
    return (
        <Button
            variant="destructive"
            onClick={async () => {
                // resolves true when confirmed; needs one <DialogHost />
                const confirmed = await confirmDialog({
                    title: "Delete this app?",
                    message:
                        "People signed in with it will be signed out.",
                    confirmLabel: "Delete",
                    cancelLabel: "Cancel",
                    destructive: true,
                })
                if (confirmed) toast.success("App deleted")
            }}
        >
            Delete app
        </Button>
    )
}
