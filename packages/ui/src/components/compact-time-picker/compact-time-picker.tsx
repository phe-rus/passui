import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react"
import {
    type KeyboardEvent,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { createPortal } from "react-dom"
import { FLOATING_LAYER } from "../../hooks/use-dismiss"
import { ClockIcon } from "../../icons/icons"
import { useAnchoredPlacement } from "../../hooks/use-anchored-placement"
import { cn } from "../../lib/class-names"
import { registerFloatingLayer } from "../../lib/floating-layers"
import { haptic } from "../../lib/haptics"
import { floatingPanelMotion } from "../../motion/transitions"
import {
    formatTime,
    fromTwelveHours,
    minuteChoices,
    parseTime,
    type TimeOfDay,
    toTwelveHours,
    usesTwelveHours,
} from "./time-value"

export interface CompactTimePickerProps {
    /** `HH:MM` on a 24 hour clock, or "" when no time is chosen. */
    value: string
    onChange: (value: string) => void
    /** Names the button and the panel for assistive technology. */
    label: string
    locale: string
    /** Minutes offered, in steps; an exact time already chosen is kept. */
    minuteStep?: number
    /** Shown when no time is chosen. */
    placeholder?: string
    labels: { hour: string; minute: string; period: string }
    className?: string
}

/**
 * A time as a compact button that opens columns of hours and minutes,
 * like SwiftUI's compact DatePicker for times, on the clock the locale
 * reads (12 hours with AM and PM, or 24).
 */
export function CompactTimePicker({
    value,
    onChange,
    label,
    locale,
    minuteStep = 5,
    placeholder,
    labels,
    className,
}: CompactTimePickerProps) {
    const [open, setOpen] = useState(false)
    const trigger = useRef<HTMLButtonElement>(null)
    const panelId = useId()
    const chosen = parseTime(value)
    const shown = chosen
        ? new Intl.DateTimeFormat(locale, {
              hour: "numeric",
              minute: "2-digit",
              timeZone: "UTC",
          }).format(
              new Date(
                  Date.UTC(
                      2000,
                      0,
                      1,
                      chosen.hour,
                      chosen.minute
                  )
              )
          )
        : (placeholder ?? "")

    return (
        <>
            <button
                ref={trigger}
                type="button"
                aria-label={
                    chosen ? `${label}, ${shown}` : label
                }
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                onClick={() => setOpen((current) => !current)}
                className={cn(
                    "flex w-full min-w-0 items-center gap-2 rounded-lg control-field px-3 py-2 text-start text-subheadline text-label",
                    className
                )}
            >
                <span
                    className={cn(
                        "min-w-0 grow truncate tabular-nums",
                        !chosen && "text-label-tertiary"
                    )}
                >
                    {shown}
                </span>
                <ClockIcon
                    size={16}
                    className="shrink-0 text-label-tertiary"
                />
            </button>
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {open && trigger.current && (
                            <TimeColumns
                                id={panelId}
                                anchor={trigger.current}
                                label={label}
                                locale={locale}
                                time={
                                    chosen ?? {
                                        hour: 9,
                                        minute: 0,
                                    }
                                }
                                minuteStep={minuteStep}
                                labels={labels}
                                onChange={(next) => {
                                    haptic("selection")
                                    onChange(formatTime(next))
                                }}
                                onClose={() => {
                                    setOpen(false)
                                    trigger.current?.focus()
                                }}
                            />
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    )
}

interface ColumnItem {
    key: number
    text: string
}

function TimeColumns({
    id,
    anchor,
    label,
    locale,
    time,
    minuteStep,
    labels,
    onChange,
    onClose,
}: {
    id: string
    anchor: HTMLElement
    label: string
    locale: string
    time: TimeOfDay
    minuteStep: number
    labels: CompactTimePickerProps["labels"]
    onChange: (time: TimeOfDay) => void
    onClose: () => void
}) {
    const root = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const twelve = usesTwelveHours(locale)
    const placement = useAnchoredPlacement(
        anchor,
        twelve ? 240 : 180,
        280
    )
    const number = new Intl.NumberFormat(locale, {
        minimumIntegerDigits: 2,
    })
    const plain = new Intl.NumberFormat(locale)
    const clock = toTwelveHours(time.hour)

    const hours: ColumnItem[] = twelve
        ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
              (hour) => ({
                  key: hour,
                  text: plain.format(hour),
              })
          )
        : Array.from({ length: 24 }, (_, hour) => ({
              key: hour,
              text: number.format(hour),
          }))
    const minutes = minuteChoices(
        minuteStep,
        time.minute
    ).map((minute) => ({
        key: minute,
        text: number.format(minute),
    }))
    // The locale's own words for morning and afternoon.
    const periodName = (pm: boolean) =>
        new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
        })
            .formatToParts(
                new Date(Date.UTC(2000, 0, 1, pm ? 13 : 1))
            )
            .find((part) => part.type === "dayPeriod")
            ?.value ?? (pm ? "PM" : "AM")
    const periods = [
        { key: 0, text: periodName(false) },
        { key: 1, text: periodName(true) },
    ]

    useLayoutEffect(() => {
        if (!root.current) return
        return registerFloatingLayer(root.current, anchor)
    }, [anchor])

    useEffect(() => {
        const onPointer = (event: PointerEvent) => {
            const target = event.target as Node
            if (
                !root.current?.contains(target) &&
                !anchor.contains(target)
            )
                onClose()
        }
        document.addEventListener("pointerdown", onPointer)
        return () =>
            document.removeEventListener(
                "pointerdown",
                onPointer
            )
    }, [anchor, onClose])

    return (
        <motion.div
            ref={root}
            id={id}
            role="dialog"
            aria-label={label}
            initial={
                reducedMotion
                    ? { opacity: 0 }
                    : {
                          opacity: 0,
                          scale: 1,
                          y: placement.above ? 6 : -6,
                      }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
                reducedMotion
                    ? { opacity: 0 }
                    : {
                          opacity: 0,
                          scale: 1,
                          y: placement.above ? 4 : -4,
                      }
            }
            transition={
                reducedMotion
                    ? { duration: 0 }
                    : floatingPanelMotion(
                          placement.above ? "above" : "below"
                      ).transition
            }
            style={{
                left: placement.left,
                width: placement.width,
                top: placement.top,
                bottom: placement.bottom,
                maxHeight: placement.maxHeight,
                overflowY: placement.maxHeight
                    ? "auto"
                    : undefined,
                transformOrigin: placement.above
                    ? "50% 100%"
                    : "50% 0%",
            }}
            className="glass-menu fixed z-[80] flex gap-1 rounded-3xl p-2"
            {...{ [FLOATING_LAYER]: "" }}
            onKeyDown={(event) => {
                if (event.key !== "Escape") return
                event.preventDefault()
                event.stopPropagation()
                onClose()
            }}
        >
            <Column
                label={labels.hour}
                items={hours}
                selected={twelve ? clock.hour : time.hour}
                autoFocus
                onSelect={(hour) =>
                    onChange({
                        ...time,
                        hour: twelve
                            ? fromTwelveHours(hour, clock.pm)
                            : hour,
                    })
                }
            />
            <Column
                label={labels.minute}
                items={minutes}
                selected={time.minute}
                onSelect={(minute) =>
                    onChange({ ...time, minute })
                }
            />
            {twelve && (
                <Column
                    label={labels.period}
                    items={periods}
                    selected={clock.pm ? 1 : 0}
                    onSelect={(period) =>
                        onChange({
                            ...time,
                            hour: fromTwelveHours(
                                clock.hour,
                                period === 1
                            ),
                        })
                    }
                />
            )}
        </motion.div>
    )
}

/** One scrolling column of choices; Up and Down move through it. */
function Column({
    label,
    items,
    selected,
    autoFocus = false,
    onSelect,
}: {
    label: string
    items: ColumnItem[]
    selected: number
    autoFocus?: boolean
    onSelect: (key: number) => void
}) {
    const list = useRef<HTMLDivElement>(null)

    // The chosen item starts in the middle of the column, then follows changes.
    useEffect(() => {
        const element =
            list.current?.querySelector<HTMLElement>(
                `[data-key="${selected}"]`
            )
        element?.scrollIntoView({ block: "center" })
        if (
            autoFocus &&
            list.current?.contains(document.activeElement) ===
                false
        )
            element?.focus()
    }, [selected, autoFocus])

    const onKeyDown = (
        event: KeyboardEvent<HTMLDivElement>
    ) => {
        const step =
            event.key === "ArrowDown"
                ? 1
                : event.key === "ArrowUp"
                  ? -1
                  : 0
        if (!step) return
        event.preventDefault()
        const index = items.findIndex(
            (item) => item.key === selected
        )
        const next =
            items[
                (index + step + items.length) % items.length
            ]
        if (!next) return
        onSelect(next.key)
        requestAnimationFrame(() =>
            list.current
                ?.querySelector<HTMLElement>(
                    `[data-key="${next.key}"]`
                )
                ?.focus()
        )
    }

    return (
        <div
            ref={list}
            role="listbox"
            aria-label={label}
            onKeyDown={onKeyDown}
            className="flex max-h-56 flex-1 snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain py-[5.25rem] [scrollbar-width:none]"
        >
            {items.map((item) => {
                const isSelected = item.key === selected
                return (
                    <button
                        key={item.key}
                        type="button"
                        role="option"
                        data-key={item.key}
                        aria-selected={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => onSelect(item.key)}
                        className={cn(
                            "flex h-11 shrink-0 snap-center items-center justify-center rounded-xl text-title3 tabular-nums transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                            isSelected
                                ? "bg-fill font-semibold text-label"
                                : "text-label-secondary hover:bg-fill/60"
                        )}
                    >
                        {item.text}
                    </button>
                )
            })}
        </div>
    )
}
