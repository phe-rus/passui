import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function ToggleUsage() {
    const [enabled, setEnabled] = useState(true)
    return (
        <Toggle
            label="Wi-Fi"
            checked={enabled}
            onChange={setEnabled}
        />
    )
}
