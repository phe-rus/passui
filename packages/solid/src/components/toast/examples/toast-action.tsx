import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"
import { Button } from "@passui/solid/button"

export function ToastAction() {
    return (
        <>
            <Button
                onClick={() =>
                    toast.success("Settings updated")
                }
            >
                Save settings
            </Button>
            <Toaster />
        </>
    )
}
