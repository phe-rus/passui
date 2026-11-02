import { useState } from "react"
import { RadioGroup } from "@passui/react/radio-group"
export function RadioGroupDisabled() {
    const options = [
        { value: "system", label: "System" },
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
    ]
    const [value, setValue] = useState("system")
    return (
        <RadioGroup
            disabled
            label="Appearance"
            value={value}
            onChange={setValue}
            options={options}
        />
    )
}
