import {
    createEffect,
    createMemo,
    createSignal,
    For,
    Show,
} from "solid-js"
import { TextField } from "../text-field/text-field"
import { dateValue } from "./date-value"
export interface DatePickerProps {
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
function splitDate(value: string) {
    const [year = "", month = "", day = ""] = value.split("-")
    return { year, month, day }
}
export function DatePicker(props: DatePickerProps) {
    const [parts, setParts] = createSignal(
        splitDate(props.value)
    )
    let emitted = props.value
    createEffect(() => {
        if (props.value !== emitted) {
            emitted = props.value
            setParts(splitDate(props.value))
        }
    })
    const invalid = createMemo(
        () =>
            parts().year.length === 4 &&
            Boolean(parts().month && parts().day) &&
            !dateValue(
                parts().year,
                parts().month,
                parts().day,
                props.max
            )
    )
    const order = createMemo(() =>
        new Intl.DateTimeFormat(props.locale, {
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
                } =>
                    part.type === "year" ||
                    part.type === "month" ||
                    part.type === "day"
            )
    )
    return (
        <fieldset class="flex min-w-0 flex-col gap-3">
            <legend class="mb-3 text-subheadline font-medium">
                {props.label}
            </legend>
            <div class="grid grid-cols-3 gap-3">
                <For each={order()}>
                    {({ type }) => (
                        <TextField
                            label={props.labels[type]}
                            inputmode="numeric"
                            autocomplete={`bday-${type}`}
                            maxLength={
                                type === "year" ? 4 : 2
                            }
                            value={parts()[type]}
                            aria-invalid={
                                invalid() || undefined
                            }
                            onInput={(event) => {
                                const next = {
                                    ...parts(),
                                    [type]: event.currentTarget.value.replace(
                                        /\D/g,
                                        ""
                                    ),
                                }
                                setParts(next)
                                emitted = dateValue(
                                    next.year,
                                    next.month,
                                    next.day,
                                    props.max
                                )
                                props.onChange(emitted)
                            }}
                        />
                    )}
                </For>
            </div>
            <Show when={invalid()}>
                <p
                    role="status"
                    class="text-footnote text-danger"
                >
                    {props.labels.invalid}
                </p>
            </Show>
        </fieldset>
    )
}
