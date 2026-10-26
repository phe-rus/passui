import { createSignal } from "solid-js"
import { accents, type AccentId } from "@passui/solid/tokens"
import { SwatchPicker } from "@passui/solid/swatch-picker"

export function SwatchPickerUsage() {
    const [value, setValue] = createSignal<AccentId>("blush")
    return (
        <SwatchPicker
            label="Accent"
            value={value()}
            onChange={setValue}
            options={Object.values(accents).map((accent) => ({
                value: accent.id,
                label: accent.name,
                color: accent.swatch,
                ink: accent.light.accentText,
            }))}
        />
    )
}
