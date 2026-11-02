import { CompactTimePicker } from "@passui/react/compact-time-picker"
import { useState } from "react"

const labels = {
    hour: "Hour",
    minute: "Minute",
    period: "AM or PM",
}

export function CompactTimePickerShowcase() {
    const [starts, setStarts] = useState("09:00")
    const [ends, setEnds] = useState("10:30")
    return (
        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
            <CompactTimePicker
                label="Starts"
                labels={labels}
                locale="en-US"
                value={starts}
                onChange={setStarts}
            />
            <CompactTimePicker
                label="Ends"
                labels={labels}
                locale="en-GB"
                value={ends}
                onChange={setEnds}
            />
        </div>
    )
}
