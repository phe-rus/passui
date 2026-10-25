import { SegmentedControl } from "@passui/react"
import { useState } from "react"

export function SegmentedControlUsage() {
    const [theme, setTheme] = useState("auto")
    return (
        <div className="w-full max-w-xs">
            <SegmentedControl
                label="Appearance"
                value={theme}
                onChange={setTheme}
                options={[
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "auto", label: "Auto" },
                ]}
            />
        </div>
    )
}
