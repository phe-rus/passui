/** @jsxImportSource solid-js */
import {
    createEffect,
    createMemo,
    createSignal,
    createUniqueId,
    For,
    Show,
    type JSX,
} from "solid-js"
import { Portal } from "solid-js/web"
import { useAnchoredPlacement } from "../../hooks/use-anchored-placement"
import { useFloatingSurface } from "../../hooks/use-floating-surface"
import { cn } from "../../lib/class-names"
import { FLOATING_LAYER } from "../../lib/floating-layers"
import { haptic } from "../../lib/haptics"
import { IconButton } from "../button/icon-button"
import {
    addDays,
    addMonths,
    firstWeekday,
    formatDay,
    monthGrid,
    parseDay,
    withinBounds,
    type CalendarDay,
} from "./calendar-month"

export interface CompactDatePickerProps {
    value: string
    onChange: (value: string) => void
    label: string
    locale: string
    min?: string
    max?: string
    placeholder?: string
    labels: {
        previousMonth: string
        nextMonth: string
        clear?: string
    }
    className?: string
    class?: string
}
const toDate = (day: CalendarDay) =>
    new Date(Date.UTC(day.year, day.month - 1, day.day))
export function CompactDatePicker(
    props: CompactDatePickerProps
) {
    const [open, setOpen] = createSignal(false)
    let anchor: HTMLButtonElement | undefined
    const id = createUniqueId()
    const chosen = createMemo(() => parseDay(props.value))
    const shown = () => {
        const day = chosen()
        return day
            ? new Intl.DateTimeFormat(props.locale, {
                  dateStyle: "medium",
                  timeZone: "UTC",
              }).format(toDate(day))
            : (props.placeholder ?? "")
    }
    const close = () => {
        setOpen(false)
        anchor?.focus()
    }
    return (
        <>
            <button
                ref={anchor}
                type="button"
                aria-label={
                    chosen()
                        ? `${props.label}, ${shown()}`
                        : props.label
                }
                aria-haspopup="dialog"
                aria-expanded={open()}
                aria-controls={open() ? id : undefined}
                onClick={() => setOpen((value) => !value)}
                class={cn(
                    "flex w-full min-w-0 items-center gap-2 rounded-lg control-field px-3 py-2 text-start text-subheadline text-label",
                    props.class,
                    props.className
                )}
            >
                <span
                    class={cn(
                        "min-w-0 grow truncate tabular-nums",
                        !chosen() && "text-label-tertiary"
                    )}
                >
                    {shown()}
                </span>
                <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                >
                    <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="3"
                    />
                    <path d="M7 3v4m10-4v4M3 11h18" />
                </svg>
            </button>
            <Show when={open() && anchor}>
                {(element) => (
                    <Portal>
                        <MonthCalendar
                            {...props}
                            anchor={element()}
                            id={id}
                            close={close}
                            choose={(value) => {
                                haptic("selection")
                                props.onChange(value)
                                close()
                            }}
                        />
                    </Portal>
                )}
            </Show>
        </>
    )
}
function MonthCalendar(
    props: CompactDatePickerProps & {
        id: string
        anchor: HTMLElement
        close: () => void
        choose: (value: string) => void
    }
) {
    let root: HTMLDivElement | undefined
    const now = new Date()
    const today = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
    }
    const [focused, setFocused] = createSignal(
        parseDay(props.value) ?? today
    )
    const placement = useAnchoredPlacement(
        () => props.anchor,
        () => 308,
        () => 360
    )
    useFloatingSurface(
        () => root,
        () => props.anchor,
        props.close
    )
    const days = createMemo(() =>
        monthGrid(
            focused().year,
            focused().month,
            firstWeekday(props.locale)
        )
    )
    const title = () =>
        new Intl.DateTimeFormat(props.locale, {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        }).format(toDate({ ...focused(), day: 1 }))
    const weekdays = createMemo(() =>
        days()
            .slice(0, 7)
            .map((day) =>
                new Intl.DateTimeFormat(props.locale, {
                    weekday: "narrow",
                    timeZone: "UTC",
                }).format(toDate(day))
            )
    )
    const fullDate = createMemo(
        () =>
            new Intl.DateTimeFormat(props.locale, {
                dateStyle: "full",
                timeZone: "UTC",
            })
    )
    createEffect(() => {
        root?.querySelector<HTMLButtonElement>(
            `[data-day="${formatDay(focused())}"]`
        )?.focus()
    })
    const key: JSX.EventHandler<
        HTMLDivElement,
        KeyboardEvent
    > = (event) => {
        const rtl =
            getComputedStyle(event.currentTarget)
                .direction === "rtl"
                ? -1
                : 1
        const actions: Record<string, () => void> = {
            ArrowLeft: () =>
                setFocused(addDays(focused(), -rtl)),
            ArrowRight: () =>
                setFocused(addDays(focused(), rtl)),
            ArrowUp: () => setFocused(addDays(focused(), -7)),
            ArrowDown: () =>
                setFocused(addDays(focused(), 7)),
            PageUp: () =>
                setFocused(
                    addMonths(
                        focused(),
                        event.shiftKey ? -12 : -1
                    )
                ),
            PageDown: () =>
                setFocused(
                    addMonths(
                        focused(),
                        event.shiftKey ? 12 : 1
                    )
                ),
            Escape: props.close,
        }
        const action = actions[event.key]
        if (action) {
            event.preventDefault()
            event.stopPropagation()
            action()
        }
    }
    return (
        <div
            ref={root}
            id={props.id}
            role="dialog"
            aria-label={props.label}
            onKeyDown={key}
            {...{ [FLOATING_LAYER]: "" }}
            class="glass-menu fixed z-[80] flex animate-in flex-col gap-2 rounded-3xl p-3 fade-in zoom-in-95 duration-normal motion-reduce:animate-none"
            style={{
                left: `${placement().left}px`,
                width: `${placement().width}px`,
                top:
                    placement().top === undefined
                        ? undefined
                        : `${placement().top}px`,
                bottom:
                    placement().bottom === undefined
                        ? undefined
                        : `${placement().bottom}px`,
                "max-height":
                    placement().maxHeight === undefined
                        ? undefined
                        : `${placement().maxHeight}px`,
                "overflow-y": placement().maxHeight
                    ? "auto"
                    : undefined,
                "transform-origin": placement().above
                    ? "50% 100%"
                    : "50% 0%",
            }}
        >
            <div class="flex items-center justify-between gap-2 ps-2">
                <p
                    class="text-headline font-semibold"
                    aria-live="polite"
                >
                    {title()}
                </p>
                <div class="flex items-center rtl:flex-row-reverse">
                    <IconButton
                        variant="ghost"
                        size="icon-sm"
                        label={props.labels.previousMonth}
                        onClick={() =>
                            setFocused(
                                addMonths(focused(), -1)
                            )
                        }
                        class="text-accent-text"
                    >
                        <span aria-hidden="true">‹</span>
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        size="icon-sm"
                        label={props.labels.nextMonth}
                        onClick={() =>
                            setFocused(
                                addMonths(focused(), 1)
                            )
                        }
                        class="text-accent-text"
                    >
                        <span aria-hidden="true">›</span>
                    </IconButton>
                </div>
            </div>
            <table
                aria-label={title()}
                class="w-full table-fixed border-separate border-spacing-y-0.5"
            >
                <thead>
                    <tr>
                        <For each={weekdays()}>
                            {(day) => (
                                <th
                                    scope="col"
                                    class="pb-1 text-center text-caption2 font-semibold text-label-tertiary"
                                >
                                    {day}
                                </th>
                            )}
                        </For>
                    </tr>
                </thead>
                <tbody>
                    <For
                        each={Array.from(
                            {
                                length: Math.ceil(
                                    days().length / 7
                                ),
                            },
                            (_, week) =>
                                days().slice(
                                    week * 7,
                                    week * 7 + 7
                                )
                        )}
                    >
                        {(week) => (
                            <tr>
                                <For each={week}>
                                    {(day) => {
                                        const value =
                                            formatDay(day)
                                        const allowed = () =>
                                            withinBounds(
                                                value,
                                                props.min,
                                                props.max
                                            )
                                        return (
                                            <td>
                                                <button
                                                    type="button"
                                                    data-day={
                                                        value
                                                    }
                                                    tabIndex={
                                                        value ===
                                                        formatDay(
                                                            focused()
                                                        )
                                                            ? 0
                                                            : -1
                                                    }
                                                    disabled={
                                                        !allowed()
                                                    }
                                                    aria-pressed={
                                                        value ===
                                                        props.value
                                                    }
                                                    aria-current={
                                                        value ===
                                                        formatDay(
                                                            today
                                                        )
                                                            ? "date"
                                                            : undefined
                                                    }
                                                    aria-label={fullDate().format(
                                                        toDate(
                                                            day
                                                        )
                                                    )}
                                                    onClick={() =>
                                                        props.choose(
                                                            value
                                                        )
                                                    }
                                                    class={cn(
                                                        "mx-auto flex size-10 items-center justify-center rounded-full text-body tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                                                        value ===
                                                            props.value
                                                            ? "bg-accent font-semibold text-on-accent"
                                                            : value ===
                                                                formatDay(
                                                                    today
                                                                )
                                                              ? "font-semibold text-accent-text hover:bg-fill/80"
                                                              : day.inMonth
                                                                ? "text-label hover:bg-fill/80"
                                                                : "text-label-tertiary hover:bg-fill/60",
                                                        !allowed() &&
                                                            "opacity-30"
                                                    )}
                                                >
                                                    {day.day}
                                                </button>
                                            </td>
                                        )
                                    }}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
            <Show when={props.labels.clear && props.value}>
                <button
                    type="button"
                    onClick={() => props.choose("")}
                    class="self-center rounded-full px-3 py-1.5 text-subheadline text-accent-text hover:bg-fill/80"
                >
                    {props.labels.clear}
                </button>
            </Show>
        </div>
    )
}
