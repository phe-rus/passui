import { Button } from "@passui/solid/button"
import { toast } from "@passui/solid/toast"

export function ButtonUsage() {
    return (
        <Button
            onClick={() => toast.success("Changes saved")}
        >
            Save changes
        </Button>
    )
}
