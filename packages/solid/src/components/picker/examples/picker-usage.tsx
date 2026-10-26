/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { Picker } from "@passui/solid/picker"

export function PickerUsage() {
    const [value, setValue] = createSignal("personal")
    return (
        <Picker
            label="Workspace"
            value={value()}
            onChange={setValue}
            searchable
            options={[
                { value: "personal", label: "Personal" },
                {
                    value: "team",
                    label: "Team",
                    detail: "Shared workspace",
                },
            ]}
        />
    )
}
