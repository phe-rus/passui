import { createSignal } from "solid-js"
import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"
import { Button } from "@passui/solid/button"

export function ToastPromise() {
    const [saving, setSaving] = createSignal(false)
    const save = async () => {
        if (saving()) return
        setSaving(true)
        try {
            await toast.promise(
                new Promise<void>((resolve) =>
                    setTimeout(resolve, 600)
                ),
                {
                    loading: "Saving your changes…",
                    success: "All changes saved",
                    error: "Unable to save changes",
                }
            )
        } finally {
            setSaving(false)
        }
    }
    return (
        <>
            <Button isPending={saving()} onClick={save}>
                Save changes
            </Button>
            <Toaster />
        </>
    )
}
