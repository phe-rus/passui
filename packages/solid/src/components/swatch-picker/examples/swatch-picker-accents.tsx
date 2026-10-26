import { createSignal } from "solid-js"
import { accents, type AccentId } from "@passui/solid/tokens"
import { SwatchPicker } from "@passui/solid/swatch-picker"
import { Button } from "@passui/solid/button"

export function SwatchPickerAccents() {
    const [accent, setAccent] =
        createSignal<AccentId>("ocean")
    const options = Object.values(accents).map((item) => ({
        value: item.id,
        label: item.name,
        color: item.swatch,
        ink: item.light.accentText,
    }))
    return (
        <div
            style={{
                "--color-accent":
                    accents[accent()].light.accent,
                "--color-on-accent":
                    accents[accent()].light.onAccent,
                "--color-accent-text":
                    accents[accent()].light.accentText,
            }}
            class="flex w-full max-w-sm flex-col items-center gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
        >
            <SwatchPicker
                label="Accent color"
                value={accent()}
                onChange={setAccent}
                options={options}
            />
            <Button variant="accent">
                {accents[accent()].name}
            </Button>
        </div>
    )
}
