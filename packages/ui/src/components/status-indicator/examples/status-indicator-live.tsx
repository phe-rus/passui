import { StatusIndicator } from "@passui/react"
import { TextField } from "@passui/react/text-field"
import { useRef, useState } from "react"

export function StatusIndicatorLive() {
    const [title, setTitle] = useState("Trip to Kyoto")
    const [saving, setSaving] = useState(false)
    const timer =
        useRef<ReturnType<typeof setTimeout>>(undefined)

    return (
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <TextField
                label="Note title"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value)
                    // a pretend save that settles a moment later
                    setSaving(true)
                    clearTimeout(timer.current)
                    timer.current = setTimeout(
                        () => setSaving(false),
                        900
                    )
                }}
            />
            <StatusIndicator
                state={saving ? "syncing" : "saved"}
            >
                {saving ? "Saving" : "Saved"}
            </StatusIndicator>
        </div>
    )
}
