import { createSignal } from "solid-js"
import { Picker } from "@passui/solid/picker"

export function PickerUsage() {
    const [sort, setSort] = createSignal("recent")
    return (
        <div class="w-full max-w-xs">
            <Picker
                label="Sort by"
                value={sort()}
                onChange={setSort}
                options={[
                    { value: "recent", label: "Most recent" },
                    { value: "name", label: "Name" },
                    { value: "size", label: "Size" },
                ]}
            />
        </div>
    )
}
