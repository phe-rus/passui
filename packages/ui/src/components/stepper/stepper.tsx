import { useId } from "react"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"
import { clampRange, stepRange } from "../../lib/range-value"
import { RollingDigit } from "./rolling-digit"

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
    const displayed = formatValue?.(current) ?? String(current)
    const digits = displayed.replace(/[^0-9]/g, "")
    let digitIndex = 0

    return (
        <div className={cn("flex min-w-0 items-center justify-between gap-3", className)}>
            <span id={id} className="min-w-0 text-subheadline text-label">
                {label}
            </span>
            <div className="flex shrink-0 items-center gap-3">
                <output
                    aria-live="polite"
                    aria-labelledby={id}
                    className="text-subheadline tabular-nums text-label"
                >
                    <span aria-hidden="true" className="inline-flex items-center">
                        {Array.from(displayed).map((character, index) => {
                            if (!/[0-9]/.test(character))
                                return <span key={`separator-${index}`}>{character}</span>
                            const prefix = digits.slice(0, ++digitIndex)
                            const place = digits.length - digitIndex
                            return (
                                <RollingDigit
                                    key={`place-${place}`}
                                    count={Number(prefix)}
                                    place={place}
                                />
                            )
                        })}
                    </span>
                    <span className="sr-only">{displayed}</span>
                </output>
                <div className="flex items-center divide-x divide-separator overflow-hidden rounded-lg bg-fill">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={labels.decrement}
                        aria-describedby={id}
                        disabled={disabled || decrement === current}
                        onClick={() => onChange(decrement)}
                        className="size-8 rounded-none text-title3 text-accent-text [@media(pointer:coarse)]:size-11"
                    >
                        −
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={labels.increment}
                        aria-describedby={id}
                        disabled={disabled || increment === current}
                        onClick={() => onChange(increment)}
                        className="size-8 rounded-none text-title3 text-accent-text [@media(pointer:coarse)]:size-11"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    )
}
