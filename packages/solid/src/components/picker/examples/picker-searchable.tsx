import { createSignal } from "solid-js"
import { Picker } from "@passui/solid/picker"

const zones = [
    {
        value: "Africa/Nairobi",
        label: "Nairobi",
        detail: "GMT+3",
    },
    {
        value: "Europe/Paris",
        label: "Paris",
        detail: "GMT+2",
    },
    {
        value: "Europe/London",
        label: "London",
        detail: "GMT+1",
    },
    {
        value: "America/New_York",
        label: "New York",
        detail: "GMT-4",
    },
    { value: "Asia/Tokyo", label: "Tokyo", detail: "GMT+9" },
    {
        value: "Australia/Sydney",
        label: "Sydney",
        detail: "GMT+11",
    },
]

export function PickerSearchable() {
    const [zone, setZone] = createSignal("Africa/Nairobi")
    return (
        <div class="w-full max-w-xs">
            <Picker
                label="Time zone"
                searchable
                value={zone()}
                onChange={setZone}
                options={zones}
                searchPlaceholder="Search cities"
                emptyLabel="No matching city"
            />
        </div>
    )
}
