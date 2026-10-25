import { Picker } from "@passui/react"
import { useState } from "react"

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
    const [zone, setZone] = useState("Africa/Nairobi")
    return (
        <div className="w-full max-w-xs">
            <Picker
                label="Time zone"
                value={zone}
                onChange={setZone}
                options={zones}
                searchable
                searchPlaceholder="Search cities"
                emptyLabel="No matching city"
            />
        </div>
    )
}
