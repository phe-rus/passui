import { motion } from "motion/react"
import { useId } from "react"
import { CheckIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { spring } from "../../motion/transitions"

export interface SwatchPickerOption<T extends string> {
    value: T
    label: string
    /** Swatch background color. */
    color: string
    /** Color of the selected checkmark. */
    ink: string
}

export type SwatchPickerSize = "sm" | "md" | "lg"

const swatchSizes: Record<SwatchPickerSize, string> = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
}
const checkSizes: Record<SwatchPickerSize, number> = {
    sm: 13,
    md: 16,
    lg: 19,
}
const captionText: Record<SwatchPickerSize, string> = {
    sm: "text-caption2",
    md: "text-caption2",
    lg: "text-caption",
}
const fieldsetGaps: Record<SwatchPickerSize, string> = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
}
const labelGaps: Record<SwatchPickerSize, string> = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
}

export interface SwatchPickerProps<T extends string> {
    value: T
    options: ReadonlyArray<SwatchPickerOption<T>>
    onChange: (value: T) => void
    /** Accessible name for the group. */
    label: string
    /** Custom classes for the swatch container. */
    className?: string
    /** Swatch diameter, check icon and caption scale. @default "md" */
    size?: SwatchPickerSize
}

/** Colour swatches with a check on the chosen one. */
export function SwatchPicker<T extends string>({
    value,
    options,
    onChange,
    label,
    className,
    size = "md",
}: SwatchPickerProps<T>) {
    const name = useId()
    return (
        <fieldset className={cn("flex flex-wrap", fieldsetGaps[size], className)}>
            <legend className="sr-only">{label}</legend>
            {options.map((option) => {
                const selected = option.value === value
                return (
                    <label
                        key={option.value}
                        className={cn(
                            "group flex cursor-pointer flex-col items-center",
                            labelGaps[size]
                        )}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selected}
                            onChange={() => {
                                haptic("selection")
                                onChange(option.value)
                            }}
                            className="peer sr-only"
                        />
                        <span
                            className={cn(
                                "flex items-center justify-center rounded-full ring-offset-1 ring-offset-elevated transition-[box-shadow,transform] duration-fast group-active:scale-95 peer-focus-visible:ring-2 peer-focus-visible:ring-accent",
                                swatchSizes[size],
                                selected
                                    ? "ring-[1.5px] ring-label/70"
                                    : "ring-0 group-hover:ring-[1.5px] group-hover:ring-separator"
                            )}
                            style={{
                                background: option.color,
                            }}
                        >
                            {selected && (
                                <motion.span
                                    initial={{
                                        scale: 0.4,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={spring.bouncy}
                                >
                                    <CheckIcon
                                        size={checkSizes[size]}
                                        strokeWidth={2.6}
                                        style={{
                                            color: option.ink,
                                        }}
                                    />
                                </motion.span>
                            )}
                        </span>
                        <span
                            className={cn(
                                captionText[size],
                                selected ? "font-semibold text-label" : "text-label-tertiary"
                            )}
                        >
                            {option.label}
                        </span>
                    </label>
                )
            })}
        </fieldset>
    )
}
