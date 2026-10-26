import { createSignal } from "solid-js"
import { SegmentedControl } from "@passui/solid/segmented-control"

export function SegmentedControlUsage() {
    const [theme, setTheme] = createSignal("auto")
    return (
        <div class="w-full max-w-xs">
            <SegmentedControl
                label="Appearance"
                value={theme()}
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
