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
    useMemo,
    useRef,
    useState,
} from "react"
import { createPortal } from "react-dom"
import { FLOATING_LAYER } from "../../hooks/use-dismiss"
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { registerFloatingLayer } from "../../lib/floating-layers"
import { haptic } from "../../lib/haptics"
import { useAnchoredPlacement } from "../../hooks/use-anchored-placement"
import { spring } from "../../motion/transitions"
import { IconButton } from "../button/icon-button"
import {
    addDays,
    addMonths,
    type CalendarDay,
    firstWeekday,
    formatDay,
    monthGrid,
    parseDay,
    withinBounds,
} from "./calendar-month"

export interface CompactDatePickerProps {
    /** `YYYY-MM-DD`, or "" when no date is chosen. */
    value: string
    onChange: (value: string) => void
    /** Names the button and the calendar for assistive technology. */
    label: string
    locale: string
    min?: string
    max?: string
    /** Shown when no date is chosen. */
    placeholder?: string
    labels: {
        previousMonth: string
        nextMonth: string
        /** Offers to remove the date, for optional dates. */
        clear?: string
    }
    className?: string
}

const WIDTH = 308

const toDate = ({ year, month, day }: CalendarDay) =>
    new Date(Date.UTC(year, month - 1, day))

function todayDay(): CalendarDay {
    const now = new Date()
    return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
    }
}

/**
 * A date as a compact button that opens a month calendar, like SwiftUI's
 * compact DatePicker: for dates on a calendar, such as an event or an
 * invoice. For dates people know by heart, like a birthday, use DatePicker.
 */
export function CompactDatePicker({
    value,
    onChange,
    label,
    locale,
    min,
    max,
    placeholder,
    labels,
    className,
}: CompactDatePickerProps) {
    const [open, setOpen] = useState(false)
    const trigger = useRef<HTMLButtonElement>(null)
    const calendarId = useId()
    const chosen = parseDay(value)
    const shown = chosen
        ? new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
              timeZone: "UTC",
          }).format(toDate(chosen))
        : (placeholder ?? "")

    const close = () => {
        setOpen(false)
        trigger.current?.focus()
    }

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
                aria-controls={open ? calendarId : undefined}
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
                <CalendarIcon
                    size={16}
                    className="shrink-0 text-label-tertiary"
                />
            </button>
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {open && trigger.current && (
                            <MonthCalendar
                                id={calendarId}
                                anchor={trigger.current}
                                label={label}
                                locale={locale}
                                value={value}
                                min={min}
                                max={max}
                                labels={labels}
                                onChoose={(next) => {
                                    haptic("selection")
                                    onChange(next)
                                    close()
                                }}
                                onClose={close}
                            />
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    )
}

function MonthCalendar({
    id,
    anchor,
    label,
    locale,
    value,
    min,
    max,
    labels,
    onChoose,
    onClose,
}: {
    id: string
    anchor: HTMLElement
    label: string
    locale: string
    value: string
    min?: string
    max?: string
    labels: CompactDatePickerProps["labels"]
    onChoose: (value: string) => void
    onClose: () => void
}) {
    const root = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const placement = useAnchoredPlacement(anchor, WIDTH, 360)
    const today = todayDay()
    const [focused, setFocused] = useState<CalendarDay>(
        () => parseDay(value) ?? today
    )
    const firstDay = useMemo(
        () => firstWeekday(locale),
        [locale]
    )
    const days = monthGrid(
        focused.year,
        focused.month,
        firstDay
    )
    const title = new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(toDate({ ...focused, day: 1 }))
    const weekdays = days.slice(0, 7).map((day) =>
        new Intl.DateTimeFormat(locale, {
            weekday: "narrow",
            timeZone: "UTC",
        }).format(toDate(day))
    )
    const fullDate = new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeZone: "UTC",
    })

    useLayoutEffect(() => {
        if (!root.current) return
        return registerFloatingLayer(root.current, anchor)
    }, [anchor])

    // The focused day takes keyboard focus as it moves.
    useEffect(() => {
        root.current
            ?.querySelector<HTMLButtonElement>(
                `[data-day="${formatDay(focused)}"]`
            )
            ?.focus()
    }, [focused])

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

    const move = (next: CalendarDay) => setFocused(next)

    const onKeyDown = (
        event: KeyboardEvent<HTMLDivElement>
    ) => {
        const rtl =
            getComputedStyle(event.currentTarget)
                .direction === "rtl"
                ? -1
                : 1
        const keys: Record<string, () => void> = {
            ArrowLeft: () => move(addDays(focused, -rtl)),
            ArrowRight: () => move(addDays(focused, rtl)),
            ArrowUp: () => move(addDays(focused, -7)),
            ArrowDown: () => move(addDays(focused, 7)),
            PageUp: () =>
                move(
                    addMonths(
                        focused,
                        event.shiftKey ? -12 : -1
                    )
                ),
            PageDown: () =>
                move(
                    addMonths(
                        focused,
                        event.shiftKey ? 12 : 1
                    )
                ),
            Escape: onClose,
        }
        const action = keys[event.key]
        if (!action) return
        event.preventDefault()
        event.stopPropagation()
        action()
    }

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
                          scale: 0.96,
                          y: placement.above ? 6 : -6,
                      }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
                reducedMotion
                    ? { opacity: 0 }
                    : {
                          opacity: 0,
                          scale: 0.98,
                          transition: { duration: 0.1 },
                      }
            }
            transition={
                reducedMotion
                    ? { duration: 0 }
                    : spring.smooth
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
            className="glass-menu fixed z-[80] flex flex-col gap-2 rounded-3xl p-3"
            {...{ [FLOATING_LAYER]: "" }}
            onKeyDown={onKeyDown}
        >
            <div className="flex items-center justify-between gap-2 ps-2">
                <p
                    className="text-headline font-semibold"
                    aria-live="polite"
                >
                    {title}
                </p>
                <div className="flex items-center rtl:flex-row-reverse">
                    <IconButton
                        variant="ghost"
                        size="icon-sm"
                        label={labels.previousMonth}
                        onClick={() =>
                            move(addMonths(focused, -1))
                        }
                        className="text-accent-text"
                    >
                        <ChevronLeftIcon size={20} />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        size="icon-sm"
                        label={labels.nextMonth}
                        onClick={() =>
                            move(addMonths(focused, 1))
                        }
                        className="text-accent-text"
                    >
                        <ChevronRightIcon size={20} />
                    </IconButton>
                </div>
            </div>
            <div
                role="grid"
                aria-label={title}
                className="grid grid-cols-7 gap-y-0.5"
            >
                <div role="row" className="contents">
                    {weekdays.map((weekday, index) => (
                        <span
                            key={index}
                            role="columnheader"
                            className="pb-1 text-center text-caption2 font-semibold text-label-tertiary"
                        >
                            {weekday}
                        </span>
                    ))}
                </div>
                {days.map((day) => {
                    const key = formatDay(day)
                    const selected = key === value
                    const isToday = key === formatDay(today)
                    const isFocused =
                        key === formatDay(focused)
                    const allowed = withinBounds(
                        key,
                        min,
                        max
                    )
                    return (
                        <button
                            key={key}
                            type="button"
                            role="gridcell"
                            data-day={key}
                            tabIndex={isFocused ? 0 : -1}
                            disabled={!allowed}
                            aria-selected={selected}
                            aria-current={
                                isToday ? "date" : undefined
                            }
                            aria-label={fullDate.format(
                                toDate(day)
                            )}
                            onClick={() => onChoose(key)}
                            className={cn(
                                "mx-auto flex size-10 items-center justify-center rounded-full text-body tabular-nums transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                                selected
                                    ? "bg-accent font-semibold text-on-accent"
                                    : isToday
                                      ? "font-semibold text-accent-text hover:bg-fill/80"
                                      : day.inMonth
                                        ? "text-label hover:bg-fill/80"
                                        : "text-label-tertiary hover:bg-fill/60",
                                !allowed && "opacity-30"
                            )}
                        >
                            {day.day}
                        </button>
                    )
                })}
            </div>
            {labels.clear && value && (
                <button
                    type="button"
                    onClick={() => onChoose("")}
                    className="self-center rounded-full px-3 py-1.5 text-subheadline text-accent-text hover:bg-fill/80"
                >
                    {labels.clear}
                </button>
            )}
        </motion.div>
    )
}
