import { useState } from "react"
import { ComboBox } from "@passui/react/combo-box"
export function ComboBoxDisabled() {
    const options = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
    ]
    const [value, setValue] = useState("react")
    return (
        <ComboBox
            disabled
            label="Framework"
            value={value}
            onChange={setValue}
            options={options}
            emptyLabel="No frameworks found"
        />
    )
}
