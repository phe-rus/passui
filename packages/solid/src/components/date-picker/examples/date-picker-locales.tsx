import { createSignal } from "solid-js"
import { DatePicker } from "@passui/solid/date-picker"

const labels = {
    day: "Day",
    month: "Month",
    year: "Year",
    invalid: "Enter a real date.",
}

export function DatePickerLocales() {
    const [us, setUs] = createSignal("1994-07-21")
    const [uk, setUk] = createSignal("1994-07-21")
    const [cn, setCn] = createSignal("1994-07-21")
    return (
        <div class="flex w-full max-w-xs flex-col gap-8">
            <DatePicker
                label="United States"
                locale="en-US"
                labels={labels}
                value={us()}
                onChange={setUs}
            />
            <DatePicker
                label="United Kingdom"
                locale="en-GB"
                labels={labels}
                value={uk()}
                onChange={setUk}
            />
            <DatePicker
                label="China"
                locale="zh-CN"
                labels={labels}
                value={cn()}
                onChange={setCn}
            />
        </div>
    )
}
