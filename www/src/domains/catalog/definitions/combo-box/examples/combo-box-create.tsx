import { useState } from "react"
import { ComboBox } from "@passui/react/combo-box"

export function ComboBoxCreate() {
    const [options, setOptions] = useState([
        { value: "design", label: "Design" },
        { value: "engineering", label: "Engineering" },
    ])
    const [value, setValue] = useState("design")
    return (
        <ComboBox
            label="Project team"
            value={value}
            onChange={setValue}
            options={options}
            emptyLabel="No teams found"
            searchPlaceholder="Find or add a team…"
            createLabel={(query) => `Add “${query}”`}
            onCreate={(query) => {
                setOptions((current) => [...current, { value: query, label: query }])
                setValue(query)
            }}
            className="w-full max-w-xs"
        />
    )
}
