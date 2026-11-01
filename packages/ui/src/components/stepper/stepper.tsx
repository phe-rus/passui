import { useId } from "react"
import { cn } from "../../lib/class-names"
import { clampRange, stepRange } from "../../lib/range-value"

export interface StepperProps {
    value: number
    onChange: (value: number) => void
    label: string
    /** Localized accessible names for each action. */
    labels: { decrement: string; increment: string }
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    className?: string
    /** Formats the displayed value. */
    formatValue?: (value: number) => string
}

/** Discrete increments with disabled boundary actions and a spoken value. */
export function Stepper({
    value,
    onChange,
    label,
    labels,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    className,
    formatValue,
}: StepperProps) {
    const id = useId()
    const upper = Math.max(min, max)
    const current = clampRange(value, min, upper)
    const decrement = stepRange(current, -1, min, upper, step > 0 ? step : 1)
    const increment = stepRange(current, 1, min, upper, step > 0 ? step : 1)
    const buttonStyle = cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl text-title2 text-accent-text",
        "transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-accent-text disabled:cursor-not-allowed disabled:opacity-35"
    )

    return (
        <div className={cn("flex min-w-0 items-center justify-between gap-3", className)}>
            <span id={id} className="min-w-0 text-subheadline font-semibold text-label">
                {label}
            </span>
            <div className="flex shrink-0 items-center gap-1 rounded-2xl border border-separator bg-elevated p-1">
                <button
                    type="button"
                    aria-label={labels.decrement}
                    aria-describedby={id}
                    disabled={disabled || decrement === current}
                    onClick={() => onChange(decrement)}
                    className={buttonStyle}
                >
                    −
                </button>
                <output
                    aria-live="polite"
                    aria-labelledby={id}
                    className="min-w-10 text-center text-subheadline tabular-nums text-label"
                >
                    {formatValue?.(current) ?? current}
                </output>
                <button
                    type="button"
                    aria-label={labels.increment}
                    aria-describedby={id}
                    disabled={disabled || increment === current}
                    onClick={() => onChange(increment)}
                    className={buttonStyle}
                >
                    +
                </button>
            </div>
        </div>
    )
}
