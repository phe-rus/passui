import type { ReactNode } from "react"
import { cn } from "@passui/react/cn"
import { Toggle } from "@passui/react/toggle"
import { useFieldContext } from "../forms/contexts"

type Option = {
    label: string
    value: string
    description?: string
    icon?: ReactNode
    disabled?: boolean
}

export function FieldRadioCard({
    label,
    description,
    options,
    disabled,
    columns = 1,
}: {
    label: string
    description?: string
    options: Option[]
    disabled?: boolean
    columns?: 1 | 2
}) {
    const field = useFieldContext<string>()
    return (
        <fieldset
            disabled={disabled}
            className="flex flex-col gap-2"
        >
            <legend className="text-subheadline font-semibold">
                {label}
            </legend>
            {description && (
                <p className="text-footnote text-label-secondary">
                    {description}
                </p>
            )}
            <div
                className={cn(
                    "grid gap-2",
                    columns === 2 && "md:grid-cols-2"
                )}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={cn(
                            "flex items-start gap-3 rounded-xl border p-3",
                            field.state.value === option.value
                                ? "border-accent-text bg-accent/10"
                                : "border-separator bg-elevated",
                            (disabled || option.disabled) &&
                                "opacity-40"
                        )}
                    >
                        <input
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={
                                field.state.value ===
                                option.value
                            }
                            disabled={option.disabled}
                            onBlur={field.handleBlur}
                            onChange={() =>
                                field.handleChange(
                                    option.value
                                )
                            }
                            className="mt-1 accent-accent-text"
                        />
                        {option.icon}
                        <span className="text-subheadline">
                            {option.label}
                            {option.description && (
                                <span className="block text-footnote text-label-secondary">
                                    {option.description}
                                </span>
                            )}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}

export function FieldMultiselect({
    label,
    description,
    options,
}: {
    label: string
    description?: string
    options: Option[]
}) {
    const field = useFieldContext<string[]>()
    return (
        <fieldset className="flex flex-col gap-3">
            <legend className="text-subheadline font-semibold">
                {label}
            </legend>
            {description && (
                <p className="text-footnote text-label-secondary">
                    {description}
                </p>
            )}
            {options.map((option) => (
                <div key={option.value}>
                    <Toggle
                        style="checkbox"
                        label={option.label}
                        disabled={option.disabled}
                        checked={field.state.value.includes(
                            option.value
                        )}
                        onChange={(checked) => {
                            field.handleChange(
                                checked
                                    ? Array.from(
                                          new Set([
                                              ...field.state
                                                  .value,
                                              option.value,
                                          ])
                                      )
                                    : field.state.value.filter(
                                          (value) =>
                                              value !==
                                              option.value
                                      )
                            )
                            field.handleBlur()
                        }}
                    />
                    {option.description && (
                        <p className="pl-8 text-footnote text-label-secondary">
                            {option.description}
                        </p>
                    )}
                </div>
            ))}
        </fieldset>
    )
}
