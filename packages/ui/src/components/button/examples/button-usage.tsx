import { toast } from "@passui/react"
import { Button } from "@passui/react/button"

export function ButtonUsage() {
    return (
        <Button
            onClick={() => toast.success("Changes saved")}
        >
            Save changes
        </Button>
    )
}
