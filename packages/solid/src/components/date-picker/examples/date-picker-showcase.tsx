import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { DatePicker } from "@passui/solid/date-picker"
import { toast } from "@passui/solid/toast"

export function DatePickerShowcase() {
    const [birthday, setBirthday] = createSignal("")
    const today = new Date().toISOString().slice(0, 10)
    return (
        <form
            class="flex w-full max-w-sm flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Birthday saved")
            }}
        >
            <div class="flex flex-col gap-1">
                <h2 class="text-headline font-semibold text-label">
                    When's your birthday?
                </h2>
                <p class="text-footnote text-label-secondary">
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
                value={birthday()}
                onChange={setBirthday}
            />
            <Button
                type="submit"
                variant="accent"
                disabled={!birthday()}
            >
                Continue
            </Button>
        </form>
    )
}
