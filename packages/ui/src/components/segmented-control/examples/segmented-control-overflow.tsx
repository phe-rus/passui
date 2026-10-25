import { SegmentedControl } from "@passui/react"
import { useState } from "react"

export function SegmentedControlOverflow() {
    const [sort, setSort] = useState("recent")

    return (
        <div className="w-full max-w-[16rem] resize-x overflow-hidden rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <SegmentedControl
                label="Sort by"
                value={sort}
                onChange={setSort}
                options={[
                    {
                        value: "recent",
                        label: "Recently edited",
                    },
                    {
                        value: "created",
                        label: "Date created",
                    },
                    { value: "title", label: "Title" },
                    { value: "size", label: "Size" },
                ]}
            />
        </div>
    )
}
