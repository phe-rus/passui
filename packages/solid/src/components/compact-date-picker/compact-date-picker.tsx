// biome-ignore-all lint/a11y/useSemanticElements: Match the React calendar's ARIA grid and directly focusable day buttons.
// biome-ignore-all lint/a11y/useFocusableInteractive: Header rows and column labels are intentionally not keyboard focus targets.
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
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Calendar03Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../icons/hugeicon"
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
        month?: string
        year?: string
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
                <Hugeicon
                    icon={Calendar03Icon}
                    size={16}
                    class="shrink-0 text-label-tertiary"
                />
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
    const [choosingMonthYear, setChoosingMonthYear] =
        createSignal(false)
    const [yearInput, setYearInput] = createSignal(
        String(focused().year)
    )
    const yearChoices = createMemo(() => {
        const center = focused().year
        return Array.from(
            { length: 9 },
            (_, index) => center - 4 + index
        ).filter(
            (year) =>
                year >= minimumYear && year <= maximumYear
        )
    })
    const setMonthYear = (year: number, month: number) => {
        if (year < minimumYear || year > maximumYear) return
        setFocused({ year, month, day: 1 })
        setYearInput(String(year))
    }
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
    const minimumYear =
        parseDay(props.min ?? "")?.year ?? today.year - 150
    const maximumYear =
        parseDay(props.max ?? "")?.year ?? today.year + 20
    const months = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1
        return {
            value: String(month),
            label: new Intl.DateTimeFormat(props.locale, {
                month: "long",
                timeZone: "UTC",
            }).format(new Date(Date.UTC(2000, index, 1))),
        }
    })
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
        if (choosingMonthYear()) return
        root?.querySelector<HTMLButtonElement>(
            `[data-day="${formatDay(focused())}"]`
        )?.focus()
    })
    const key: JSX.EventHandler<
        HTMLDivElement,
        KeyboardEvent
    > = (event) => {
        if (choosingMonthYear() && event.key !== "Escape")
            return
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
            <div class="flex items-center justify-between gap-2">
                <p class="sr-only" aria-live="polite">
                    {title()}
                </p>
                <button
                    type="button"
                    aria-expanded={choosingMonthYear()}
                    aria-label={`${title()}, choose month and year`}
                    onClick={() => {
                        setYearInput(String(focused().year))
                        setChoosingMonthYear(
                            (value) => !value
                        )
                    }}
                    class="flex min-w-0 items-center gap-2 rounded-full px-3 py-2 text-headline font-semibold text-label transition-colors hover:bg-fill/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                    <span class="truncate">{title()}</span>
                    <span
                        aria-hidden="true"
                        class="text-caption text-label-tertiary"
                    >
                        {choosingMonthYear() ? "⌃" : "⌄"}
                    </span>
                </button>
                <Show when={!choosingMonthYear()}>
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
                            <Hugeicon
                                icon={ArrowLeft01Icon}
                                size={20}
                            />
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
                            <Hugeicon
                                icon={ArrowRight01Icon}
                                size={20}
                            />
                        </IconButton>
                    </div>
                </Show>
            </div>
            <Show when={choosingMonthYear()}>
                <div class="flex flex-col gap-3 rounded-2xl bg-fill/40 p-3">
                    <div class="flex items-center justify-between gap-2">
                        <span class="text-footnote font-semibold text-label-secondary">
                            {props.labels.year ?? "Year"}
                        </span>
                        <div class="flex items-center gap-2">
                            <input
                                type="number"
                                inputMode="numeric"
                                aria-label={
                                    props.labels.year ??
                                    "Year"
                                }
                                min={minimumYear}
                                max={maximumYear}
                                value={yearInput()}
                                onInput={(event) =>
                                    setYearInput(
                                        event.currentTarget
                                            .value
                                    )
                                }
                                onChange={() => {
                                    const year = Number(
                                        yearInput()
                                    )
                                    if (
                                        Number.isInteger(year)
                                    ) {
                                        setMonthYear(
                                            year,
                                            focused().month
                                        )
                                    } else {
                                        setYearInput(
                                            String(
                                                focused().year
                                            )
                                        )
                                    }
                                }}
                                class="w-20 rounded-lg border border-separator bg-elevated px-2 py-1.5 text-center text-subheadline tabular-nums text-label focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                            />
                        </div>
                    </div>
                    <div
                        class="grid grid-cols-5 gap-1"
                        role="group"
                        aria-label="Nearby years"
                    >
                        <For each={yearChoices()}>
                            {(year) => (
                                <button
                                    type="button"
                                    aria-pressed={
                                        year ===
                                        focused().year
                                    }
                                    onClick={() =>
                                        setMonthYear(
                                            year,
                                            focused().month
                                        )
                                    }
                                    class={cn(
                                        "rounded-lg py-2 text-caption tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                                        year ===
                                            focused().year
                                            ? "bg-accent font-semibold text-on-accent"
                                            : "text-label-secondary hover:bg-fill/80"
                                    )}
                                >
                                    {year}
                                </button>
                            )}
                        </For>
                    </div>
                    <span class="text-footnote font-semibold text-label-secondary">
                        {props.labels.month ?? "Month"}
                    </span>
                    <div
                        class="grid grid-cols-3 gap-1"
                        role="group"
                        aria-label="Months"
                    >
                        <For each={months}>
                            {(month) => (
                                <button
                                    type="button"
                                    aria-pressed={
                                        Number(
                                            month.value
                                        ) === focused().month
                                    }
                                    onClick={() => {
                                        setMonthYear(
                                            focused().year,
                                            Number(
                                                month.value
                                            )
                                        )
                                        setChoosingMonthYear(
                                            false
                                        )
                                    }}
                                    class={cn(
                                        "rounded-xl px-1 py-2 text-subheadline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                                        Number(
                                            month.value
                                        ) === focused().month
                                            ? "bg-accent font-semibold text-on-accent"
                                            : "text-label hover:bg-fill/80"
                                    )}
                                >
                                    {month.label}
                                </button>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
            <div
                hidden={choosingMonthYear()}
                role="grid"
                aria-label={title()}
                class="grid grid-cols-7 gap-y-0.5"
            >
                <div role="row" class="contents">
                    <For each={weekdays()}>
                        {(day) => (
                            <span
                                role="columnheader"
                                class="pb-1 text-center text-caption2 font-semibold text-label-tertiary"
                            >
                                {day}
                            </span>
                        )}
                    </For>
                </div>
                <For each={days()}>
                    {(day) => {
                        const value = formatDay(day)
                        const selected = () =>
                            value === props.value
                        const isToday =
                            value === formatDay(today)
                        const allowed = () =>
                            withinBounds(
                                value,
                                props.min,
                                props.max
                            )
                        return (
                            <button
                                type="button"
                                role="gridcell"
                                data-day={value}
                                tabIndex={
                                    value ===
                                    formatDay(focused())
                                        ? 0
                                        : -1
                                }
                                disabled={!allowed()}
                                aria-selected={selected()}
                                aria-current={
                                    isToday
                                        ? "date"
                                        : undefined
                                }
                                aria-label={fullDate().format(
                                    toDate(day)
                                )}
                                onClick={() =>
                                    props.choose(value)
                                }
                                class={cn(
                                    "mx-auto flex size-10 items-center justify-center rounded-full text-body tabular-nums transition-colors",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                                    selected()
                                        ? "bg-accent font-semibold text-on-accent"
                                        : isToday
                                          ? "font-semibold text-accent-text hover:bg-fill/80"
                                          : day.inMonth
                                            ? "text-label hover:bg-fill/80"
                                            : "text-label-tertiary hover:bg-fill/60",
                                    !allowed() && "opacity-30"
                                )}
                            >
                                {day.day}
                            </button>
                        )
                    }}
                </For>
            </div>
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
