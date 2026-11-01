import { CompactTimePicker } from "@passui/react/compact-time-picker"
import { useState } from "react"

export function CompactTimePickerUsage() {
    const [time, setTime] = useState("18:30")
    return (
        <div className="w-full max-w-xs">
            <CompactTimePicker
                label="Time"
                labels={{
                    hour: "Hour",
                    minute: "Minute",
                    period: "AM or PM",
                }}
                locale="en-US"
                value={time}
                onChange={setTime}
            />
        </div>
    )
}
