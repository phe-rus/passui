import { CheckIcon } from "../../icons/icons"
import {
    animate,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "motion/react"
import { useEffect, useId, useRef } from "react"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { spring } from "../../motion/transitions"

export type ToggleStyle = "switch" | "checkbox"

export interface ToggleProps {
    /** Current on or off state. */
    checked: boolean
    /** Called with the next checked state. */
    onChange: (checked: boolean) => void
    /** Accessible name, including when the visible label is hidden. */
    label: string
    disabled?: boolean
    /** `switch` for a setting, `checkbox` for a selection. @default "switch" */
    style?: ToggleStyle
    /** Reports a mixed selection to assistive technology. @default false */
    mixed?: boolean
    /** Keeps the accessible name while hiding the visible label. @default false */
    labelHidden?: boolean
}

export function Toggle({
    checked,
    onChange,
    label,
    disabled,
    style = "switch",
    mixed = false,
    labelHidden = false,
}: ToggleProps) {
    const input = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (input.current) input.current.indeterminate = mixed
    }, [mixed])
    if (style === "checkbox") {
        return (
            <label
                className={cn(
                    "flex cursor-pointer items-center gap-3 text-subheadline",
                    disabled && "cursor-not-allowed opacity-40"
                )}
            >
                <span className="relative inline-flex size-5 shrink-0">
                    <input
                        ref={input}
                        type="checkbox"
                        aria-checked={mixed ? "mixed" : checked}
                        checked={checked}
                        disabled={disabled}
                        onChange={(event) => onChange(event.target.checked)}
                        className={cn(
                            "peer size-5 cursor-inherit appearance-none rounded-sm border border-separator/80 bg-elevated transition-colors checked:border-transparent checked:bg-accent indeterminate:border-transparent indeterminate:bg-accent motion-reduce:transition-none",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                        )}
                    />
                    {mixed ? (
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 m-auto h-0.5 w-2.5 rounded-full bg-on-accent"
                        />
                    ) : (
                        <CheckIcon
                            aria-hidden="true"
                            size={14}
                            strokeWidth={2.5}
                            className="pointer-events-none absolute inset-0 m-auto text-on-accent opacity-0 peer-checked:opacity-100"
                        />
                    )}
                </span>
                <span className={labelHidden ? "sr-only" : undefined}>{label}</span>
            </label>
        )
    }
    return <SwitchToggle checked={checked} onChange={onChange} label={label} disabled={disabled} />
}

function SwitchToggle({
    checked,
    onChange,
    label,
    disabled,
}: Pick<ToggleProps, "checked" | "onChange" | "label" | "disabled">) {
    const reducedMotion = useReducedMotion()
    const id = `toggle-goo-${useId().replace(/:/g, "")}`
    const x = useMotionValue(checked ? 22 : 2)
    // One position owns the thumb. The drop follows that position, not a delayed target.
    const chase = useSpring(x, spring.snappy)
    const dropX = useTransform(chase, (value) => value + 5)
    const gesture = useRef({ start: 0, x: 0, moved: false, skipClick: false, held: false })
    useEffect(() => {
        if (reducedMotion) {
            x.set(checked ? 22 : 2)
            return
        }
        const animation = animate(x, checked ? 22 : 2, spring.snappy)
        return () => animation.stop()
    }, [checked, reducedMotion, x])
    const choose = (next: boolean) => {
        if (disabled) return
        haptic("selection")
        if (next !== checked) onChange(next)
        // Releasing on the current side still needs a settling spring.
        if (reducedMotion) x.set(next ? 22 : 2)
        else animate(x, next ? 22 : 2, spring.snappy)
    }
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={() => {
                if (gesture.current.skipClick) {
                    gesture.current.skipClick = false
                    return
                }
                choose(!checked)
            }}
            onPointerDown={(event) => {
                if (event.button !== 0 || disabled) return
                event.currentTarget.setPointerCapture(event.pointerId)
                gesture.current = {
                    start: event.clientX,
                    x: x.get(),
                    moved: false,
                    skipClick: false,
                    held: true,
                }
            }}
            onPointerMove={(event) => {
                const drag = gesture.current
                if (!drag.held || disabled) return
                const direction = getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1
                const delta = (event.clientX - drag.start) * direction
                if (Math.abs(delta) > 3) drag.moved = true
                if (drag.moved) x.set(Math.max(2, Math.min(22, drag.x + delta)))
            }}
            onPointerUp={() => {
                const drag = gesture.current
                if (!drag.held) return
                drag.held = false
                if (!drag.moved) return
                drag.skipClick = true
                choose(x.get() >= 12)
            }}
            onPointerCancel={() => {
                gesture.current.held = false
                gesture.current.skipClick = false
                choose(checked)
            }}
            className={cn(
                "relative h-[30px] w-[50px] shrink-0 touch-pan-y rounded-full transition-colors duration-normal motion-reduce:transition-none",
                "shadow-[inset_0_1px_2px_rgb(0_0_0/0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:opacity-45",
                checked ? "bg-accent" : "bg-separator/80"
            )}
        >
            <svg aria-hidden="true" width="0" height="0" className="absolute">
                <defs>
                    <filter
                        id={id}
                        x="-50%"
                        y="-100%"
                        width="200%"
                        height="300%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="2.5" result="smear" />
                        <feColorMatrix
                            in="smear"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                        />
                    </filter>
                </defs>
            </svg>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rtl:-scale-x-100"
                style={{ filter: reducedMotion ? undefined : `url(#${id})` }}
            >
                {!reducedMotion && (
                    <motion.span
                        className="absolute top-[7px] left-0 size-4 rounded-full bg-white"
                        style={{ x: dropX }}
                    />
                )}
                <motion.span
                    className="absolute top-0.5 left-0 size-[26px] rounded-full bg-white"
                    style={{ x }}
                />
            </span>
        </button>
    )
}
