/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { Toggle } from "@passui/solid/toggle"

export function ToggleUsage() {
    const [checked, setChecked] = createSignal(true)
    return (
        <Toggle
            label="Sync"
            checked={checked()}
            onChange={setChecked}
        />
    )
}
