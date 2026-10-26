import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"
import { Button } from "@passui/solid/button"
export function ToastUsage() {
    return (
        <>
            <Button
                onClick={() => toast.success("Changes saved")}
            >
                Save
            </Button>
            <Toaster />
        </>
    )
}
