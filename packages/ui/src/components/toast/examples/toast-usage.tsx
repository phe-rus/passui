import { Button } from "@passui/react/button"
import { toast } from "@passui/react/toast"

export function ToastUsage() {
    // render one <Toaster /> near the root of your app
    return (
        <Button
            onClick={() => toast.success("Changes saved")}
        >
            Save
        </Button>
    )
}
