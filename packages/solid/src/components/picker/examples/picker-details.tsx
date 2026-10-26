import { createSignal } from "solid-js"
import { Picker } from "@passui/solid/picker"

export function PickerDetails() {
    const [value, setValue] = createSignal("personal")
    return (
        <div class="w-full max-w-sm">
            <Picker
                label="Workspace"
                value={value()}
                onChange={setValue}
                options={[
                    {
                        value: "personal",
                        label: "Personal",
                        detail: "Only visible to you",
                    },
                    {
                        value: "team",
                        label: "Team",
                        detail: "Shared with collaborators",
                    },
                    {
                        value: "public",
                        label: "Public",
                        detail: "Anyone with the link",
                    },
                ]}
            />
        </div>
    )
}
