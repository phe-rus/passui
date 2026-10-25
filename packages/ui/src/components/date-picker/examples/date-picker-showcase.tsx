import { toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { DatePicker } from "@passui/react/date-picker"
import { useState } from "react"

export function DatePickerShowcase() {
    const [birthday, setBirthday] = useState("")
    const today = new Date().toISOString().slice(0, 10)

    return (
        <form
            className="flex w-full max-w-sm flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Birthday saved")
            }}
        >
            <div className="flex flex-col gap-1">
                <h2 className="text-headline font-semibold text-label">
                    When's your birthday?
                </h2>
                <p className="text-footnote text-label-secondary">
                    We use it to keep your account suited to
                    your age. It isn't shown to anyone.
                </p>
            </div>
            <DatePicker
                label="Birthday"
                labels={{
                    day: "Day",
                    month: "Month",
                    year: "Year",
                    invalid: "Enter a real date in the past.",
                }}
                locale="en-US"
                max={today}
                value={birthday}
                onChange={setBirthday}
            />
            <Button
                type="submit"
                variant="accent"
                disabled={!birthday}
            >
                Continue
            </Button>
        </form>
    )
}
