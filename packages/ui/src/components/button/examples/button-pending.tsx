import { toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { useState } from "react"

export function ButtonPending() {
    const [saving, setSaving] = useState(false)

    async function save() {
        setSaving(true)
        // stands in for a real request
        await new Promise((resolve) =>
            setTimeout(resolve, 1600)
        )
        setSaving(false)
        toast.success("Profile saved")
    }

    return (
        <Button
            variant="accent"
            isPending={saving}
            onClick={save}
        >
            Save profile
        </Button>
    )
}
