import { type ComponentProps, useId } from "react"
import { cn } from "../../lib/class-names"
import { clampRange } from "../../lib/range-value"

export interface SliderProps
    extends Omit<
        ComponentProps<"input">,
        "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
    > {
    value: number
    onChange: (value: number) => void
    label: string
    min?: number
    max?: number
    step?: number
    description?: string
    /** Provides a localized, spoken description of the current value. */
    formatValue?: (value: number) => string
}

/** Native keyboard, touch and pointer behavior with Passui's control treatment. */
export function Slider({
    value,
    onChange,
    label,
    min = 0,
    max = 100,
    step = 1,
    description,
    formatValue,
    id: suppliedId,
    className,
    disabled,
    ...props
}: SliderProps) {
    const generatedId = useId()
    const id = suppliedId ?? generatedId
    const upper = Math.max(min, max)
    const current = clampRange(value, min, upper)

    return (
        <div className={cn("flex min-w-0 flex-col gap-2", disabled && "opacity-45")}>
            <label htmlFor={id} className="text-subheadline font-semibold text-label">
                {label}
            </label>
            <input
                {...props}
                id={id}
                type="range"
                min={min}
                max={upper}
                step={step > 0 ? step : 1}
                value={current}
                disabled={disabled || upper === min}
                aria-valuetext={formatValue?.(current)}
                aria-describedby={description ? `${id}-description` : undefined}
                onChange={(event) => onChange(Number(event.currentTarget.value))}
                className={cn(
                    "h-11 w-full min-w-0 cursor-pointer appearance-none bg-transparent accent-accent",
                    "focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
                    "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-separator",
                    "[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-elevated [&::-webkit-slider-thumb]:shadow-sm",
                    "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-separator",
                    "[&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-accent",
                    "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-elevated",
                    className
                )}
            />
            {description && (
                <p id={`${id}-description`} className="text-footnote text-label-secondary">
                    {description}
                </p>
            )}
        </div>
    )
}
