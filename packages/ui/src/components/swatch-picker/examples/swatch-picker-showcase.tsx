import { Chip, SwatchPicker } from "@passui/react"
import { useState } from "react"

const colours = [
    {
        value: "sky",
        label: "Sky",
        color: "#9fc3ec",
        ink: "#1f4f86",
    },
    {
        value: "mint",
        label: "Mint",
        color: "#a7d8bd",
        ink: "#1f6644",
    },
    {
        value: "sun",
        label: "Sun",
        color: "#f3cf6b",
        ink: "#7a5600",
    },
    {
        value: "rose",
        label: "Rose",
        color: "#f0b3be",
        ink: "#8c2f45",
    },
    {
        value: "lilac",
        label: "Lilac",
        color: "#cbbcf0",
        ink: "#4b348f",
    },
]

export function SwatchPickerShowcase() {
    const [colour, setColour] = useState("mint")
    const chosen =
        colours.find((option) => option.value === colour) ??
        colours[0]

    return (
        <section className="flex w-full max-w-sm flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
            <div
                className="flex h-28 items-end rounded-3xl p-4 transition-colors duration-500"
                style={{ backgroundColor: chosen.color }}
            >
                <span
                    className="text-title3 font-bold"
                    style={{ color: chosen.ink }}
                >
                    Garden notes
                </span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-subheadline font-semibold text-label">
                    Notebook colour
                </span>
                <Chip tone="neutral">{chosen.label}</Chip>
            </div>
            <SwatchPicker
                label="Notebook colour"
                value={colour}
                onChange={setColour}
                options={colours}
            />
        </section>
    )
}
