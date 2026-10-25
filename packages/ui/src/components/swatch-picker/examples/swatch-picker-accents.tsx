import { SwatchPicker } from "@passui/react"
import { Button } from "@passui/react/button"
import { type AccentId, accents } from "@passui/react/tokens"
import { type CSSProperties, useState } from "react"

// every Passui accent, straight from the tokens
const options = Object.values(accents).map((accent) => ({
    value: accent.id,
    label: accent.name,
    color: accent.swatch,
    ink: accent.light.accentText,
}))

export function SwatchPickerAccents() {
    const [accent, setAccent] = useState<AccentId>("ocean")
    const colors = accents[accent].light

    // An app sets data-accent on <html>; this card sets the accent's
    // colors on itself, so the button below shows the choice.
    const style = {
        "--color-accent": colors.accent,
        "--color-on-accent": colors.onAccent,
        "--color-accent-text": colors.accentText,
    } as CSSProperties

    return (
        <div
            style={style}
            className="flex w-full max-w-sm flex-col items-center gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
        >
            <SwatchPicker
                label="Accent color"
                options={options}
                value={accent}
                onChange={setAccent}
            />
            <Button variant="accent">
                {accents[accent].name}
            </Button>
        </div>
    )
}
