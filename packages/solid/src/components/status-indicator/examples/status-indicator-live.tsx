import { createSignal, onCleanup } from "solid-js"
import { TextField } from "@passui/solid/text-field"
import { StatusIndicator } from "@passui/solid/status-indicator"

export function StatusIndicatorLive() {
    const [title, setTitle] = createSignal("Trip to Kyoto")
    const [saving, setSaving] = createSignal(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    onCleanup(() => clearTimeout(timer))
    return (
        <div class="flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <TextField
                label="Note title"
                value={title()}
                onInput={(event) => {
                    setTitle(event.currentTarget.value)
                    setSaving(true)
                    clearTimeout(timer)
                    timer = setTimeout(
                        () => setSaving(false),
                        900
                    )
                }}
            />
            <StatusIndicator
                state={saving() ? "syncing" : "saved"}
            >
                {saving() ? "Saving" : "Saved"}
            </StatusIndicator>
        </div>
    )
}
