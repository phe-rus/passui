import { createSignal } from "solid-js"
import { Picker } from "@passui/solid/picker"

export function PickerSearchable() {
    const [value, setValue] = createSignal("uganda")
    return (
        <div class="w-full max-w-sm">
            <Picker
                label="Country"
                searchable
                value={value()}
                onChange={setValue}
                options={[
                    { value: "uganda", label: "Uganda" },
                    { value: "kenya", label: "Kenya" },
                    { value: "rwanda", label: "Rwanda" },
                    { value: "tanzania", label: "Tanzania" },
                ]}
            />
        </div>
    )
}
