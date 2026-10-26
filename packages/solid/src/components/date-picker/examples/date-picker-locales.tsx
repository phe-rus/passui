import { createSignal } from "solid-js"
import { DatePicker } from "@passui/solid/date-picker"

export function DatePickerLocales() {
    const [date, setDate] = createSignal("2026-10-26")
    return (
        <div class="w-full max-w-sm">
            <DatePicker
                label="Appointment date"
                locale="fr-FR"
                value={date()}
                onChange={setDate}
                labels={{
                    day: "Jour",
                    month: "Mois",
                    year: "Année",
                    invalid: "Date invalide",
                }}
            />
        </div>
    )
}
