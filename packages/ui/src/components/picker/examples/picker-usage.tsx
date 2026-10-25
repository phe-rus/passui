import { Picker } from "@passui/react"
import { useState } from "react"

export function PickerUsage() {
    const [sort, setSort] = useState("recent")
    return (
        <div className="w-full max-w-xs">
            <Picker
                label="Sort by"
                value={sort}
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
