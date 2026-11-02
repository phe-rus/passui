import { useId } from "react"
import { cn } from "../../lib/class-names"

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
}: RadioGroupProps<T>) {
    const id = useId()
    return (
        <fieldset disabled={disabled} className={cn("flex min-w-0 flex-col gap-2", className)}>
            <legend className="mb-2 text-footnote font-medium text-label-secondary">{label}</legend>
            {options.map((option, index) => (
                <label
                    key={option.value}
                    className="flex min-h-8 items-start gap-2 text-subheadline text-label has-disabled:opacity-40 [@media(pointer:coarse)]:min-h-11"
                >
                    <input
                        type="radio"
                        name={name ?? id}
                        value={option.value}
                        checked={value === option.value}
                        disabled={option.disabled}
                        onChange={() => onChange(option.value)}
                        aria-describedby={option.description ? `${id}-${index}` : undefined}
                        className="mt-1 size-4 shrink-0 accent-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                    />
                    <span>
                        {option.label}
                        {option.description && (
                            <span
                                id={`${id}-${index}`}
                                className="block text-footnote text-label-secondary"
                            >
                                {option.description}
                            </span>
                        )}
                    </span>
                </label>
            ))}
        </fieldset>
    )
}
