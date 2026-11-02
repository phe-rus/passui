import { useState } from "react"
import { ComboBox } from "@passui/react/combo-box"
export function ComboBoxShowcase() {
    const options = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
    ]
    const [value, setValue] = useState("react")
    return (
        <div className="w-full max-w-sm">
            <ComboBox
                label="Framework"
                value={value}
                onChange={setValue}
                options={options}
                emptyLabel="No frameworks found"
            />
        </div>
    )
}
