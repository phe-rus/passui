import {
    TextField,
    type TextFieldProps,
} from "@passui/react/text-field"
import { TextEditor } from "@passui/react/text-editor"
import { Toggle } from "@passui/react/toggle"
import { useFieldContext } from "../forms/contexts"
import {
    createContext,
    useContext,
    type ComponentProps,
    type ReactNode,
} from "react"

export const PeachFieldLabels = createContext<
    { show: string; hide: string } | undefined
>(undefined)

export function FieldInput(
    props: Omit<
        TextFieldProps,
        "value" | "onChange" | "onBlur" | "name"
    >
) {
    const field = useFieldContext<string>()
    const revealLabels = useContext(PeachFieldLabels)
    return (
        <TextField
            revealLabels={revealLabels}
            {...props}
            name={field.name}
            value={field.state.value}
            onChange={(event) =>
                field.handleChange(event.target.value)
            }
            onBlur={field.handleBlur}
            errors={
                field.state.meta.isTouched
                    ? field.state.meta.errors.flatMap(
                          (error) =>
                              error?.message
                                  ? [error.message]
                                  : []
                      )
                    : []
            }
        />
    )
}

export function FieldCheckbox({ label }: { label: string }) {
    const field = useFieldContext<boolean>()
    return (
        <Toggle
            style="checkbox"
            label={label}
            checked={field.state.value}
            onChange={(checked) => {
                field.handleChange(checked)
                field.handleBlur()
            }}
        />
    )
}

export function FieldSwitch({
    label,
    description,
    disabled,
}: {
    label: string
    description?: string
    disabled?: boolean
}) {
    const field = useFieldContext<boolean>()
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="text-subheadline">
                {label}
                {description && (
                    <p className="text-footnote text-label-secondary">
                        {description}
                    </p>
                )}
            </div>
            <Toggle
                label={label}
                checked={field.state.value}
                disabled={disabled}
                onChange={(checked) => {
                    field.handleChange(checked)
                    field.handleBlur()
                }}
            />
        </div>
    )
}

export function FieldTextarea({
    label,
    icon,
    ...props
}: ComponentProps<"textarea"> & {
    label: string
    icon?: ReactNode
}) {
    const field = useFieldContext<string>()
    const errors = field.state.meta.isTouched
        ? field.state.meta.errors.flatMap((error) =>
              error?.message ? [error.message] : []
          )
        : []
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={field.name}
                className="text-subheadline font-semibold"
            >
                {icon}
                {label}
            </label>
            <TextEditor
                {...props}
                id={field.name}
                name={field.name}
                aria-invalid={errors.length > 0}
                aria-describedby={
                    errors.length
                        ? `${field.name}-errors`
                        : undefined
                }
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                    field.handleChange(event.target.value)
                }
            />
            {errors.length > 0 && (
                <p
                    id={`${field.name}-errors`}
                    role="alert"
                    className="text-footnote text-danger"
                >
                    {Array.from(new Set(errors)).join(". ")}
                </p>
            )}
        </div>
    )
}

export function FieldOtp({
    label,
    maxLength = 6,
    onComplete,
}: {
    label: string
    maxLength?: number
    onComplete?: (value: string) => void
}) {
    const field = useFieldContext<string>()
    return (
        <TextField
            label={label}
            name={field.name}
            value={field.state.value}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={maxLength}
            autoFocus
            onBlur={field.handleBlur}
            onChange={(event) => {
                const code = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, maxLength)
                field.handleChange(code)
                if (code.length === maxLength)
                    onComplete?.(code)
            }}
            errors={
                field.state.meta.isTouched
                    ? field.state.meta.errors.flatMap(
                          (error) =>
                              error?.message
                                  ? [error.message]
                                  : []
                      )
                    : []
            }
        />
    )
}
