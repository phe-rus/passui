import { motion, useReducedMotion } from "motion/react"
import { useId, useLayoutEffect, useRef, useState } from "react"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { spring } from "../../motion/transitions"
import { Picker } from "../picker/picker"

export type SegmentedControlSize = "sm" | "md" | "lg"

const segmentPaddings: Record<SegmentedControlSize, string> = {
    sm: "p-[2px]",
    md: "p-[3px]",
    lg: "p-[4px]",
}
const segmentLabelClasses: Record<SegmentedControlSize, string> = {
    sm: "min-w-[52px] px-2 py-0.5 text-caption2 whitespace-nowrap",
    md: "min-w-[64px] px-3 py-1 text-footnote whitespace-nowrap",
    lg: "min-w-[80px] px-4 py-1.5 text-subheadline whitespace-nowrap",
}
const segmentRadius: Record<SegmentedControlSize, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
}
const fallbackPickerSizes: Record<SegmentedControlSize, string> = {
    sm: "rounded-md py-1 text-caption2 font-semibold",
    md: "rounded-lg py-1.5 text-footnote font-semibold",
    lg: "rounded-lg py-2 text-subheadline font-semibold",
}

export interface SegmentedControlProps<T extends string> {
    /** Value of the selected segment. */
    value: T
    /** The choices, in display order. */
    options: ReadonlyArray<{ value: T; label: string }>
    /** Called with the selected segment's value. */
    onChange: (value: NoInfer<T>) => void
    /** Accessible name for the group and its compact picker. */
    label: string
    /** Custom classes for the control container. */
    className?: string
    /** Segment padding, label text scale and min-width. @default "md" */
    size?: SegmentedControlSize
}

/**
 * Mutually exclusive choices with a sliding selection, as on Apple
 * platforms. When the labels can't all fit the space it is given (a long
 * translation, a narrow pane) it becomes a pop-up button instead of
 * squeezing or spilling its text.
 */
export function SegmentedControl<T extends string>({
    value,
    options,
    onChange,
    label,
    className,
    size = "md",
}: SegmentedControlProps<T>) {
    const id = useId()
    const reducedMotion = useReducedMotion()
    const frame = useRef<HTMLDivElement>(null)
    const measure = useRef<HTMLDivElement>(null)
    const [fits, setFits] = useState(true)

    useLayoutEffect(() => {
        const box = frame.current
        const natural = measure.current
        if (!box || !natural) return
        const check = () => setFits(natural.offsetWidth <= box.clientWidth + 0.5)
        check()
        const observer = new ResizeObserver(check)
        observer.observe(box)
        observer.observe(natural)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={frame} className={cn("relative w-full min-w-0", className)}>
            {/* The control at its natural size, to know whether it fits. */}
            <div
                ref={measure}
                aria-hidden="true"
                className={cn(
                    "pointer-events-none invisible absolute top-0 flex w-max font-semibold",
                    segmentPaddings[size],
                    segmentLabelClasses[size].replace(/min-w-\[[^\]]+\]\s*/, "")
                )}
            >
                {options.map((option) => (
                    <span key={option.value} className={segmentLabelClasses[size]}>
                        {option.label}
                    </span>
                ))}
            </div>
            {fits ? (
                <fieldset
                    className={cn(
                        "flex w-full rounded-lg bg-fill shadow-[inset_0_1px_2px_rgb(40_30_0/0.06)]",
                        segmentPaddings[size]
                    )}
                >
                    <legend className="sr-only">{label}</legend>
                    {options.map((option) => {
                        const selected = option.value === value
                        return (
                            <label
                                key={option.value}
                                className={cn(
                                    "relative isolate flex-1 cursor-pointer text-center whitespace-nowrap transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/60",
                                    segmentLabelClasses[size].replace("whitespace-nowrap", ""),
                                    segmentRadius[size],
                                    selected
                                        ? "font-semibold text-label"
                                        : "font-medium text-label-secondary hover:text-label"
                                )}
                            >
                                <input
                                    type="radio"
                                    name={id}
                                    value={option.value}
                                    checked={selected}
                                    onChange={() => {
                                        haptic("selection")
                                        onChange(option.value)
                                    }}
                                    className="sr-only"
                                />
                                {selected && (
                                    <motion.span
                                        layoutId={`segment-${id}`}
                                        className={cn(
                                            "absolute inset-0 -z-10 bg-elevated shadow-[0_0_0_0.5px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.08),0_3px_8px_-2px_rgb(0_0_0/0.10)]",
                                            segmentRadius[size]
                                        )}
                                        transition={reducedMotion ? { duration: 0 } : spring.snappy}
                                    />
                                )}
                                {option.label}
                            </label>
                        )
                    })}
                </fieldset>
            ) : (
                <Picker<T>
                    label={label}
                    value={value}
                    options={options}
                    onChange={onChange}
                    searchable={false}
                    className={fallbackPickerSizes[size]}
                    size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
                />
            )}
        </div>
    )
}
