import { SwatchPicker } from "@passui/react"
import { useState } from "react"

export function SwatchPickerUsage() {
    const [colour, setColour] = useState("sky")
    return (
        <SwatchPicker
            label="Label colour"
            value={colour}
            onChange={setColour}
            options={[
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
            ]}
        />
    )
}
