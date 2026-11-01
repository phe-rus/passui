import { useState } from "react"
import { TextField } from "../text-field/text-field"
import { dateValue } from "./date-value"

type DatePickerProps = {
    value: string
    onChange: (value: string) => void
    label: string
    labels: {
        day: string
        month: string
        year: string
        invalid: string
    }
    locale: string
    max?: string
}

/** Segmented date entry suited to birthdays, without a native calendar dialog. */
export function DatePicker({ value, onChange, label, labels, locale, max }: DatePickerProps) {
    const [year, month, day] = value.split("-")
    const [parts, setParts] = useState({
        year: year ?? "",
        month: month ?? "",
        day: day ?? "",
    })
    const complete = parts.year.length === 4 && Boolean(parts.month && parts.day)
    const invalid = complete && !dateValue(parts.year, parts.month, parts.day, max)
    const order = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC",
    })
        .formatToParts(new Date("2000-01-02T00:00:00Z"))
        .filter(
            (
                part
            ): part is Intl.DateTimeFormatPart & {
                type: "year" | "month" | "day"
            } => part.type === "year" || part.type === "month" || part.type === "day"
        )
    return (
        <fieldset className="flex min-w-0 flex-col gap-3">
            <legend className="mb-3 text-subheadline font-medium">{label}</legend>
            <div className="grid grid-cols-3 gap-3">
                {order.map(({ type }) => (
                    <TextField
                        key={type}
                        label={labels[type]}
                        inputMode="numeric"
                        autoComplete={`bday-${type}`}
                        maxLength={type === "year" ? 4 : 2}
                        value={parts[type]}
                        aria-invalid={invalid || undefined}
                        onChange={(event) => {
                            const next = {
                                ...parts,
                                [type]: event.target.value.replace(/\D/g, ""),
                            }
                            setParts(next)
                            onChange(dateValue(next.year, next.month, next.day, max))
                        }}
                    />
                ))}
            </div>
            {invalid && (
                <p role="status" className="text-footnote text-danger">
                    {labels.invalid}
                </p>
            )}
        </fieldset>
    )
}
