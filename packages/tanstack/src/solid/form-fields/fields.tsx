/** @jsxImportSource solid-js */
import {
    createContext,
    For,
    Show,
    splitProps,
    useContext,
    type JSX,
} from "solid-js"
import {
    TextField,
    type TextFieldProps,
} from "@passui/solid/text-field"
import { TextEditor } from "@passui/solid/text-editor"
import { Toggle } from "@passui/solid/toggle"
import { cn } from "@passui/solid/cn"
import { useFieldContext } from "../forms/contexts"
export const PeachFieldLabels = createContext<{
    show: string
    hide: string
}>()
function errors(values: unknown[]) {
    return values.flatMap((error) =>
        typeof error === "string"
            ? [error]
            : error &&
                typeof error === "object" &&
                "message" in error
              ? [String(error.message)]
              : []
    )
}
export function FieldInput(
    props: Omit<
        TextFieldProps,
        "value" | "onInput" | "onBlur" | "name"
    >
) {
    const field = useFieldContext<string>(),
        reveal = useContext(PeachFieldLabels)
    return (
        <TextField
            revealLabels={reveal}
            {...props}
            name={field().name}
            value={field().state.value}
            onInput={(event) =>
                field().handleChange(
                    event.currentTarget.value
                )
            }
            onBlur={() => field().handleBlur()}
            errors={
                field().state.meta.isTouched
                    ? errors(field().state.meta.errors)
                    : []
            }
        />
    )
}
export function FieldCheckbox(props: {
    label: string
    disabled?: boolean
}) {
    const field = useFieldContext<boolean>()
    return (
        <Toggle
            style="checkbox"
            label={props.label}
            disabled={props.disabled}
            checked={field().state.value}
            onChange={(checked) => {
                field().handleChange(checked)
                field().handleBlur()
            }}
        />
    )
}
export function FieldSwitch(props: {
    label: string
    description?: string
    disabled?: boolean
}) {
    const field = useFieldContext<boolean>()
    return (
        <div class="flex items-center justify-between gap-4">
            <div class="text-subheadline">
                {props.label}
                <Show when={props.description}>
                    <p class="text-footnote text-label-secondary">
                        {props.description}
                    </p>
                </Show>
            </div>
            <Toggle
                label={props.label}
                checked={field().state.value}
                disabled={props.disabled}
                onChange={(checked) => {
                    field().handleChange(checked)
                    field().handleBlur()
                }}
            />
        </div>
    )
}
export function FieldTextarea(
    props: Omit<
        JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
        "value" | "onInput" | "onBlur"
    > & { label: string; icon?: JSX.Element }
) {
    const [local, rest] = splitProps(props, [
            "label",
            "icon",
        ]),
        field = useFieldContext<string>()
    const messages = () =>
        field().state.meta.isTouched
            ? errors(field().state.meta.errors)
            : []
    return (
        <div class="flex flex-col gap-2">
            <label
                for={field().name}
                class="text-subheadline font-semibold"
            >
                {local.icon}
                {local.label}
            </label>
            <TextEditor
                {...rest}
                id={field().name}
                name={field().name}
                aria-invalid={messages().length > 0}
                aria-describedby={
                    messages().length
                        ? `${field().name}-errors`
                        : undefined
                }
                value={field().state.value}
                onBlur={() => field().handleBlur()}
                onInput={(event) =>
                    field().handleChange(
                        event.currentTarget.value
                    )
                }
            />
            <Show when={messages().length}>
                <p
                    id={`${field().name}-errors`}
                    role="alert"
                    class="text-footnote text-danger"
                >
                    {Array.from(new Set(messages())).join(
                        ". "
                    )}
                </p>
            </Show>
        </div>
    )
}
export function FieldOtp(props: {
    label: string
    maxLength?: number
    onComplete?: (value: string) => void
}) {
    const field = useFieldContext<string>()
    return (
        <TextField
            label={props.label}
            name={field().name}
            value={field().state.value}
            inputmode="numeric"
            autocomplete="one-time-code"
            pattern="[0-9]*"
            maxLength={props.maxLength ?? 6}
            onBlur={() => field().handleBlur()}
            onInput={(event) => {
                const value = event.currentTarget.value
                    .replace(/\D/g, "")
                    .slice(0, props.maxLength ?? 6)
                field().handleChange(value)
                if (value.length === (props.maxLength ?? 6))
                    props.onComplete?.(value)
            }}
            errors={
                field().state.meta.isTouched
                    ? errors(field().state.meta.errors)
                    : []
            }
        />
    )
}
export type FieldOption = {
    label: string
    value: string
    description?: string
    icon?: JSX.Element
    disabled?: boolean
}
export function FieldRadioCard(props: {
    label: string
    description?: string
    options: FieldOption[]
    disabled?: boolean
    columns?: 1 | 2
}) {
    const field = useFieldContext<string>()
    return (
        <fieldset
            disabled={props.disabled}
            class="flex flex-col gap-2"
        >
            <legend class="text-subheadline font-semibold">
                {props.label}
            </legend>
            <Show when={props.description}>
                <p class="text-footnote text-label-secondary">
                    {props.description}
                </p>
            </Show>
            <div
                class={cn(
                    "grid gap-2",
                    props.columns === 2 && "md:grid-cols-2"
                )}
            >
                <For each={props.options}>
                    {(option) => (
                        <label
                            class={cn(
                                "flex items-start gap-3 rounded-xl border p-3",
                                field().state.value ===
                                    option.value
                                    ? "border-accent-text bg-accent/10"
                                    : "border-separator bg-elevated",
                                (props.disabled ||
                                    option.disabled) &&
                                    "opacity-40"
                            )}
                        >
                            <input
                                type="radio"
                                name={field().name}
                                value={option.value}
                                checked={
                                    field().state.value ===
                                    option.value
                                }
                                disabled={option.disabled}
                                onBlur={() =>
                                    field().handleBlur()
                                }
                                onChange={() =>
                                    field().handleChange(
                                        option.value
                                    )
                                }
                                class="mt-1 accent-accent-text"
                            />
                            {option.icon}
                            <span class="text-subheadline">
                                {option.label}
                                <Show
                                    when={option.description}
                                >
                                    <span class="block text-footnote text-label-secondary">
                                        {option.description}
                                    </span>
                                </Show>
                            </span>
                        </label>
                    )}
                </For>
            </div>
        </fieldset>
    )
}
export function FieldMultiselect(props: {
    label: string
    description?: string
    options: FieldOption[]
}) {
    const field = useFieldContext<string[]>()
    return (
        <fieldset class="flex flex-col gap-3">
            <legend class="text-subheadline font-semibold">
                {props.label}
            </legend>
            <Show when={props.description}>
                <p class="text-footnote text-label-secondary">
                    {props.description}
                </p>
            </Show>
            <For each={props.options}>
                {(option) => (
                    <div>
                        <Toggle
                            style="checkbox"
                            label={option.label}
                            disabled={option.disabled}
                            checked={field().state.value.includes(
                                option.value
                            )}
                            onChange={(checked) => {
                                field().handleChange(
                                    checked
                                        ? Array.from(
                                              new Set([
                                                  ...field()
                                                      .state
                                                      .value,
                                                  option.value,
                                              ])
                                          )
                                        : field().state.value.filter(
                                              (value) =>
                                                  value !==
                                                  option.value
                                          )
                                )
                                field().handleBlur()
                            }}
                        />
                        <Show when={option.description}>
                            <p class="pl-8 text-footnote text-label-secondary">
                                {option.description}
                            </p>
                        </Show>
                    </div>
                )}
            </For>
        </fieldset>
    )
}
