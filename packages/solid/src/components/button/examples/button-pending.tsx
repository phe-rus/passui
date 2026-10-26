/** @jsxImportSource solid-js */
import { createSignal, onCleanup } from "solid-js"
import { Button } from "@passui/solid/button"

export function ButtonPending() {
    const [saving, setSaving] = createSignal(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    onCleanup(() => clearTimeout(timer))
    function save() {
        setSaving(true)
        timer = setTimeout(() => setSaving(false), 1600)
    }
    return (
        <Button
            variant="accent"
            isPending={saving()}
            onClick={save}
        >
            Save profile
        </Button>
    )
}
