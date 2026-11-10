import { useAnchoredDisclosure } from "../../hooks/use-anchored-disclosure"
import { AnchoredSurface } from "../popover/anchored-surface"
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { IconButton } from "../button/icon-button"
import { pickerTriggerStyle, type PickerSize } from "../picker/picker-trigger"
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
    /** Prevents opening the date panel. @default false */
    disabled?: boolean
    /** Trigger button density; matches Picker's sm | md | lg. @default "md" */
    size?: PickerSize
}

const WIDTH = 308

const toDate = ({ year, month, day }: CalendarDay) => new Date(Date.UTC(year, month - 1, day))

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
    disabled = false,
    size = "md",
}: CompactDatePickerProps) {
    const panel = useAnchoredDisclosure(disabled)
    const { open } = panel
    const trigger = useRef<HTMLButtonElement>(null)
    const calendarId = useId()
    const chosen = parseDay(value)
    const shown = chosen
        ? new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
              timeZone: "UTC",
          }).format(toDate(chosen))
        : (placeholder ?? "")

    const close = (restoreFocus: boolean) => {
        panel.close()
        if (restoreFocus) trigger.current?.focus({ preventScroll: true })
    }

    return (
        <>
            <button
                ref={trigger}
                type="button"
                aria-label={chosen ? `${label}, ${shown}` : label}
                aria-haspopup="dialog"
                aria-expanded={open && !disabled}
                aria-controls={open && !disabled ? calendarId : undefined}
                disabled={disabled}
                onClick={() => panel.toggle()}
                className={pickerTriggerStyle(className, size)}
            >
                <span
                    className={cn(
                        "min-w-0 grow truncate tabular-nums",
                        !chosen && "text-label-tertiary"
                    )}
                >
                    {shown}
                </span>
                <CalendarIcon size={16} className="shrink-0 text-label-tertiary" />
            </button>
            {typeof document !== "undefined" &&
                createPortal(
                    panel.mounted && trigger.current ? (
                        <MonthCalendar
                            open={open}
                            onExited={panel.onExited}
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
                                close(true)
                            }}
                            onClose={close}
                        />
                    ) : null,
                    document.body
                )}
        </>
    )
}

function MonthCalendar({
    open,
    onExited,
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
    open: boolean
    onExited: () => void
    id: string
    anchor: HTMLElement
    label: string
    locale: string
    value: string
    min?: string
    max?: string
    labels: CompactDatePickerProps["labels"]
    onChoose: (value: string) => void
    onClose: (restoreFocus: boolean) => void
}) {
    const root = useRef<HTMLDivElement>(null)
    const today = todayDay()
    const [focused, setFocused] = useState<CalendarDay>(() => parseDay(value) ?? today)
    const firstDay = useMemo(() => firstWeekday(locale), [locale])
    const days = monthGrid(focused.year, focused.month, firstDay)
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

    // The focused day takes keyboard focus as it moves.
    useEffect(() => {
        root.current
            ?.querySelector<HTMLButtonElement>(`[data-day="${formatDay(focused)}"]`)
            ?.focus()
    }, [focused])

    const move = (next: CalendarDay) => setFocused(next)

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const rtl = getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1
        const keys: Record<string, () => void> = {
            ArrowLeft: () => move(addDays(focused, -rtl)),
            ArrowRight: () => move(addDays(focused, rtl)),
            ArrowUp: () => move(addDays(focused, -7)),
            ArrowDown: () => move(addDays(focused, 7)),
            PageUp: () => move(addMonths(focused, event.shiftKey ? -12 : -1)),
            PageDown: () => move(addMonths(focused, event.shiftKey ? 12 : 1)),
            Escape: () => onClose(true),
        }
        const action = keys[event.key]
        if (!action) return
        event.preventDefault()
        event.stopPropagation()
        action()
    }

    return (
        <AnchoredSurface
            open={open}
            onExited={onExited}
            ref={root}
            anchor={anchor}
            width={WIDTH}
            needed={360}
            onClose={onClose}
            id={id}
            role="dialog"
            aria-label={label}
            contentClassName="gap-2 p-3"
            onKeyDown={onKeyDown}
        >
            <div className="flex items-center justify-between gap-2 ps-2">
                <p className="text-headline font-semibold" aria-live="polite">
                    {title}
                </p>
                <div className="flex items-center rtl:flex-row-reverse">
                    <IconButton
                        variant="ghost"
                        size="icon-sm"
                        label={labels.previousMonth}
                        onClick={() => move(addMonths(focused, -1))}
                        className="text-accent-text"
                    >
                        <ChevronLeftIcon size={20} />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        size="icon-sm"
                        label={labels.nextMonth}
                        onClick={() => move(addMonths(focused, 1))}
                        className="text-accent-text"
                    >
                        <ChevronRightIcon size={20} />
                    </IconButton>
                </div>
            </div>
            <div role="grid" aria-label={title} className="grid grid-cols-7 gap-y-0.5">
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
                    const isFocused = key === formatDay(focused)
                    const allowed = withinBounds(key, min, max)
                    return (
                        <button
                            key={key}
                            type="button"
                            role="gridcell"
                            data-day={key}
                            tabIndex={isFocused ? 0 : -1}
                            disabled={!allowed}
                            aria-selected={selected}
                            aria-current={isToday ? "date" : undefined}
                            aria-label={fullDate.format(toDate(day))}
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
        </AnchoredSurface>
    )
}
