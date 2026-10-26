import { createSignal } from "solid-js"
import { CompactDatePicker } from "@passui/solid/compact-date-picker"
export function CompactDatePickerUsage() {
    const [due, setDue] = createSignal("")
    return (
        <div class="w-full max-w-xs">
            <CompactDatePicker
                label="Due"
                placeholder="None"
                locale="en-US"
                value={due()}
                onChange={setDue}
                labels={{
                    previousMonth: "Previous month",
                    nextMonth: "Next month",
                    clear: "Remove date",
                }}
            />
        </div>
    )
}
