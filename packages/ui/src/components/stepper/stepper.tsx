import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useId, useRef } from "react"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"
import { clampRange, stepRange } from "../../lib/range-value"
import { spring } from "../../motion/transitions"

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
    const reducedMotion = useReducedMotion()
    const upper = Math.max(min, max)
    const current = clampRange(value, min, upper)
    const previousValue = useRef(current)
    const direction = current >= previousValue.current ? 1 : -1
    previousValue.current = current
    const decrement = stepRange(current, -1, min, upper, step > 0 ? step : 1)
    const increment = stepRange(current, 1, min, upper, step > 0 ? step : 1)
    const displayed = formatValue?.(current) ?? String(current)
    const displayWidth = Math.max(
        displayed.length,
        (formatValue?.(min) ?? String(min)).length,
        (formatValue?.(upper) ?? String(upper)).length
    )
    const characters = Array.from(displayed.padStart(displayWidth, " "))

    return (
        <div className={cn("flex min-w-0 items-center justify-between gap-3", className)}>
            <span id={id} className="min-w-0 text-subheadline font-semibold text-label">
                {label}
            </span>
            <div className="flex shrink-0 items-center gap-1 rounded-2xl border border-separator bg-elevated p-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={labels.decrement}
                    aria-describedby={id}
                    disabled={disabled || decrement === current}
                    onClick={() => onChange(decrement)}
                    className="size-11 rounded-xl text-title2 text-accent-text"
                >
                    −
                </Button>
                <output
                    aria-live="polite"
                    aria-labelledby={id}
                    className="relative min-w-10 text-center text-subheadline tabular-nums text-label"
                >
                    <span aria-hidden="true" className="inline-flex min-h-[1.4em] items-center">
                        {characters.map((character, index) => {
                            const isDigit = /\p{N}/u.test(character)
                            return (
                                <span
                                    key={`${index}-${isDigit ? "digit" : "text"}`}
                                    className={cn(
                                        "inline-block",
                                        isDigit &&
                                            "relative inline-grid overflow-hidden align-middle"
                                    )}
                                >
                                    <AnimatePresence initial={false} mode="popLayout">
                                        <motion.span
                                            key={character}
                                            initial={
                                                reducedMotion
                                                    ? false
                                                    : {
                                                          y: direction > 0 ? "100%" : "-100%",
                                                          opacity: 0.5,
                                                      }
                                            }
                                            animate={{ y: "0%", opacity: 1 }}
                                            exit={
                                                reducedMotion
                                                    ? { opacity: 0 }
                                                    : {
                                                          y: direction > 0 ? "-100%" : "100%",
                                                          opacity: 0.45,
                                                      }
                                            }
                                            transition={
                                                reducedMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          ...spring.bouncy,
                                                          delay:
                                                              (characters.length - 1 - index) *
                                                              0.04,
                                                      }
                                            }
                                            className="col-start-1 row-start-1 inline-block"
                                        >
                                            {character}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                            )
                        })}
                    </span>
                    <span className="sr-only">{displayed}</span>
                </output>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={labels.increment}
                    aria-describedby={id}
                    disabled={disabled || increment === current}
                    onClick={() => onChange(increment)}
                    className="size-11 rounded-xl text-title2 text-accent-text"
                >
                    +
                </Button>
            </div>
        </div>
    )
}
