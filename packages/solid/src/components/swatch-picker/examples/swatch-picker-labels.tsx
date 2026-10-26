import { createSignal } from "solid-js"
import { SwatchPicker } from "@passui/solid/swatch-picker"

export function SwatchPickerLabels() {
    const [value, setValue] = createSignal("sky")
    return (
        <SwatchPicker
            label="Notebook color"
            value={value()}
            onChange={setValue}
            options={[
                {
                    value: "sky",
                    label: "Sky",
                    color: "#6ba9e8",
                    ink: "#172c41",
                },
                {
                    value: "rose",
                    label: "Rose",
                    color: "#e69eb4",
                    ink: "#462032",
                },
                {
                    value: "mint",
                    label: "Mint",
                    color: "#7dcfbb",
                    ink: "#1e3b34",
                },
            ]}
        />
    )
}
