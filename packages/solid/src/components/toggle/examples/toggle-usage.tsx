import { createSignal } from "solid-js"
import { Toggle } from "@passui/solid/toggle"

export function ToggleUsage() {
    const [checked, setChecked] = createSignal(true)
    return (
        <div class="flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border border-separator bg-elevated p-4">
            <div class="flex flex-col gap-1">
                <span class="text-subheadline font-semibold">
                    Cloud sync
                </span>
                <span class="text-footnote text-label-secondary">
                    Drag the switch, tap it, or use Space on
                    the keyboard.
                </span>
            </div>
            <Toggle
                label="Cloud sync"
                checked={checked()}
                onChange={setChecked}
            />
        </div>
    )
}
