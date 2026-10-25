import { CompactDatePicker } from "@passui/react/compact-date-picker"
import { useState } from "react"

export function CompactDatePickerUsage() {
    const [due, setDue] = useState("")
    return (
        <div className="w-full max-w-xs">
            <CompactDatePicker
                label="Due"
                placeholder="None"
                labels={{
                    previousMonth: "Previous month",
                    nextMonth: "Next month",
                    clear: "Remove date",
                }}
                locale="en-US"
                value={due}
                onChange={setDue}
            />
        </div>
    )
}
