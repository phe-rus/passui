import { DatePicker } from "@passui/react/date-picker"
import { useState } from "react"

export function DatePickerPastOnly() {
    const [birthday, setBirthday] = useState("2090-01-01")
    const today = new Date().toISOString().slice(0, 10)

    return (
        <div className="flex w-full max-w-xs flex-col gap-3">
            <DatePicker
                label="Birthday"
                labels={{
                    day: "Day",
                    month: "Month",
                    year: "Year",
                    invalid:
                        "Your birthday can't be in the future.",
                }}
                locale="en-US"
                max={today}
                value={birthday}
                onChange={setBirthday}
            />
            <p className="text-footnote text-label-secondary">
                Saved value: {birthday || "none yet"}
            </p>
        </div>
    )
}
