import { DatePicker } from "@passui/react/date-picker"
import { useState } from "react"

export function DatePickerUsage() {
    const [birthday, setBirthday] = useState("")
    return (
        <div className="w-full max-w-xs">
            <DatePicker
                label="Birthday"
                labels={{
                    day: "Day",
                    month: "Month",
                    year: "Year",
                    invalid: "Enter a real date.",
                }}
                locale="en-US"
                value={birthday}
                onChange={setBirthday}
            />
        </div>
    )
}
