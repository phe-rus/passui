import { createSignal } from "solid-js"
import { Toggle } from "@passui/solid/toggle"

export function ToggleUsage() {
    const [enabled, setEnabled] = createSignal(true)
    return (
        <Toggle
            label="Wi-Fi"
            checked={enabled()}
            onChange={setEnabled}
        />
    )
}
