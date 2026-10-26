import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"
export function ToastUsage() {
    return (
        <>
            <button
                type="button"
                onClick={() => toast.success("Changes saved")}
            >
                Save changes
            </button>
            <Toaster />
        </>
    )
}
