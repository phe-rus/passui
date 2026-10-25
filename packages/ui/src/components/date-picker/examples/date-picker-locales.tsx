import { DatePicker } from "@passui/react/date-picker"
import { useState } from "react"

const labels = {
    day: "Day",
    month: "Month",
    year: "Year",
    invalid: "Enter a real date.",
}

export function DatePickerLocales() {
    const [us, setUs] = useState("1994-07-21")
    const [uk, setUk] = useState("1994-07-21")
    const [cn, setCn] = useState("1994-07-21")

    return (
        <div className="flex w-full max-w-xs flex-col gap-8">
            <DatePicker
                label="United States"
                labels={labels}
                locale="en-US"
                value={us}
                onChange={setUs}
            />
            <DatePicker
                label="United Kingdom"
                labels={labels}
                locale="en-GB"
                value={uk}
                onChange={setUk}
            />
            <DatePicker
                label="China"
                labels={labels}
                locale="zh-CN"
                value={cn}
                onChange={setCn}
            />
        </div>
    )
}
