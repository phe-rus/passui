import { useId } from "react"
import { cn } from "../../lib/class-names"

export type RadioGroupSize = "sm" | "md" | "lg"

const legendSizes: Record<RadioGroupSize, string> = {
    sm: "mb-1.5 text-caption2 font-medium text-label-secondary",
    md: "mb-2 text-footnote font-medium text-label-secondary",
    lg: "mb-2.5 text-subheadline font-medium text-label-secondary",
}
const rowSizes: Record<RadioGroupSize, string> = {
    sm: "flex min-h-7 items-start gap-1.5 text-footnote text-label has-disabled:opacity-40 [@media(pointer:coarse)]:min-h-10",
    md: "flex min-h-8 items-start gap-2 text-subheadline text-label has-disabled:opacity-40 [@media(pointer:coarse)]:min-h-11",
    lg: "flex min-h-10 items-start gap-2.5 text-body text-label has-disabled:opacity-40 [@media(pointer:coarse)]:min-h-12",
}
const radioSizes: Record<RadioGroupSize, string> = {
    sm: "mt-0.5 size-3.5 shrink-0 accent-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
    md: "mt-1 size-4 shrink-0 accent-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
    lg: "mt-1 size-5 shrink-0 accent-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
}
const descriptionSizes: Record<RadioGroupSize, string> = {
    sm: "block text-caption2 text-label-secondary",
    md: "block text-footnote text-label-secondary",
    lg: "block text-subheadline text-label-secondary",
}

export interface RadioGroupOption<T extends string> {
    value: T
    label: string
    description?: string
    disabled?: boolean
}
export interface RadioGroupProps<T extends string> {
    value: T
    onChange: (value: NoInfer<T>) => void
    label: string
    options: readonly RadioGroupOption<T>[]
    disabled?: boolean
    name?: string
    className?: string
    /** Legend, row, radio glyph and description density. @default "md" */
    size?: RadioGroupSize
}
/** A labelled choice group using the browser's native radio keyboard behavior. */
export function RadioGroup<T extends string>({
    value,
    onChange,
    label,
    options,
    disabled,
    name,
    className,
    size = "md",
}: RadioGroupProps<T>) {
    const id = useId()
    return (
        <fieldset disabled={disabled} className={cn("flex min-w-0 flex-col gap-2", className)}>
            <legend className={legendSizes[size]}>{label}</legend>
            {options.map((option, index) => (
                <label key={option.value} className={rowSizes[size]}>
                    <input
                        type="radio"
                        name={name ?? id}
                        value={option.value}
                        checked={value === option.value}
                        disabled={option.disabled}
                        onChange={() => onChange(option.value)}
                        aria-describedby={option.description ? `${id}-${index}` : undefined}
                        className={radioSizes[size]}
                    />
                    <span>
                        {option.label}
                        {option.description && (
                            <span id={`${id}-${index}`} className={descriptionSizes[size]}>
                                {option.description}
                            </span>
                        )}
                    </span>
                </label>
            ))}
        </fieldset>
    )
}
