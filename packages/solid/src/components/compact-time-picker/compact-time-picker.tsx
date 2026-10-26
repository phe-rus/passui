import {
    createEffect,
    createMemo,
    createSignal,
    createUniqueId,
    For,
    Show,
} from "solid-js"
import { Portal } from "solid-js/web"
import { Clock01Icon } from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../icons/hugeicon"
import { useAnchoredPlacement } from "../../hooks/use-anchored-placement"
import { useFloatingSurface } from "../../hooks/use-floating-surface"
import { cn } from "../../lib/class-names"
import { FLOATING_LAYER } from "../../lib/floating-layers"
import { haptic } from "../../lib/haptics"
import {
    formatTime,
    fromTwelveHours,
    minuteChoices,
    parseTime,
    toTwelveHours,
    usesTwelveHours,
    type TimeOfDay,
} from "./time-value"

export interface CompactTimePickerProps {
    value: string
    onChange: (value: string) => void
    label: string
    locale: string
    minuteStep?: number
    placeholder?: string
    labels: { hour: string; minute: string; period: string }
    className?: string
    class?: string
}
export function CompactTimePicker(
    props: CompactTimePickerProps
) {
    const [open, setOpen] = createSignal(false)
    let anchor: HTMLButtonElement | undefined
    const id = createUniqueId()
    const chosen = createMemo(() => parseTime(props.value))
    const shown = () => {
        const time = chosen()
        return time
            ? new Intl.DateTimeFormat(props.locale, {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZone: "UTC",
              }).format(
                  new Date(
                      Date.UTC(
                          2000,
                          0,
                          1,
                          time.hour,
                          time.minute
                      )
                  )
              )
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
                    icon={Clock01Icon}
                    size={16}
                    class="shrink-0 text-label-tertiary"
                />
            </button>
            <Show when={open() && anchor}>
                {(element) => (
                    <Portal>
                        <TimeColumns
                            {...props}
                            id={id}
                            anchor={element()}
                            time={
                                chosen() ?? {
                                    hour: 9,
                                    minute: 0,
                                }
                            }
                            close={close}
                            choose={(time) => {
                                haptic("selection")
                                props.onChange(
                                    formatTime(time)
                                )
                            }}
                        />
                    </Portal>
                )}
            </Show>
        </>
    )
}
function TimeColumns(
    props: CompactTimePickerProps & {
        id: string
        anchor: HTMLElement
        time: TimeOfDay
        close: () => void
        choose: (time: TimeOfDay) => void
    }
) {
    let root: HTMLDivElement | undefined
    const twelve = () => usesTwelveHours(props.locale)
    const placement = useAnchoredPlacement(
        () => props.anchor,
        () => (twelve() ? 240 : 180),
        () => 280
    )
    useFloatingSurface(
        () => root,
        () => props.anchor,
        props.close
    )
    const clock = () => toTwelveHours(props.time.hour)
    const number = createMemo(
        () =>
            new Intl.NumberFormat(props.locale, {
                minimumIntegerDigits: 2,
            })
    )
    const hours = createMemo(() =>
        twelve()
            ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                  (hour) => ({
                      key: hour,
                      text: new Intl.NumberFormat(
                          props.locale
                      ).format(hour),
                  })
              )
            : Array.from({ length: 24 }, (_, hour) => ({
                  key: hour,
                  text: number().format(hour),
              }))
    )
    const minutes = createMemo(() =>
        minuteChoices(
            Number.isFinite(props.minuteStep ?? 5)
                ? Math.max(
                      1,
                      Math.min(
                          60,
                          Math.floor(props.minuteStep ?? 5)
                      )
                  )
                : 5,
            props.time.minute
        ).map((minute) => ({
            key: minute,
            text: number().format(minute),
        }))
    )
    const periods = createMemo(() =>
        [false, true].map((pm) => ({
            key: pm ? 1 : 0,
            text:
                new Intl.DateTimeFormat(props.locale, {
                    hour: "numeric",
                    hour12: true,
                    timeZone: "UTC",
                })
                    .formatToParts(
                        new Date(
                            Date.UTC(2000, 0, 1, pm ? 13 : 1)
                        )
                    )
                    .find((part) => part.type === "dayPeriod")
                    ?.value ?? (pm ? "PM" : "AM"),
        }))
    )
    return (
        <div
            ref={root}
            id={props.id}
            role="dialog"
            aria-label={props.label}
            {...{ [FLOATING_LAYER]: "" }}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    event.preventDefault()
                    event.stopPropagation()
                    props.close()
                }
            }}
            class="glass-menu fixed z-[80] flex animate-in gap-1 rounded-3xl p-2 fade-in zoom-in-95 duration-normal motion-reduce:animate-none"
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
            <Column
                label={props.labels.hour}
                items={hours()}
                selected={
                    twelve() ? clock().hour : props.time.hour
                }
                autoFocus
                onSelect={(hour) =>
                    props.choose({
                        ...props.time,
                        hour: twelve()
                            ? fromTwelveHours(
                                  hour,
                                  clock().pm
                              )
                            : hour,
                    })
                }
            />
            <Column
                label={props.labels.minute}
                items={minutes()}
                selected={props.time.minute}
                onSelect={(minute) =>
                    props.choose({ ...props.time, minute })
                }
            />
            <Show when={twelve()}>
                <Column
                    label={props.labels.period}
                    items={periods()}
                    selected={clock().pm ? 1 : 0}
                    onSelect={(period) =>
                        props.choose({
                            ...props.time,
                            hour: fromTwelveHours(
                                clock().hour,
                                period === 1
                            ),
                        })
                    }
                />
            </Show>
        </div>
    )
}
function Column(props: {
    label: string
    items: { key: number; text: string }[]
    selected: number
    autoFocus?: boolean
    onSelect: (key: number) => void
}) {
    let root: HTMLDivElement | undefined
    createEffect(() => {
        const element = root?.querySelector<HTMLElement>(
            `[data-key="${props.selected}"]`
        )
        element?.scrollIntoView({ block: "center" })
        if (
            props.autoFocus &&
            root?.contains(document.activeElement) === false
        )
            element?.focus()
    })
    return (
        <div
            ref={root}
            role="listbox"
            aria-label={props.label}
            class="flex max-h-56 flex-1 snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain py-[5.25rem] [scrollbar-width:none]"
            onKeyDown={(event) => {
                const step =
                    event.key === "ArrowDown"
                        ? 1
                        : event.key === "ArrowUp"
                          ? -1
                          : 0
                if (!step) return
                event.preventDefault()
                const index = props.items.findIndex(
                    (item) => item.key === props.selected
                )
                const next =
                    props.items[
                        (index + step + props.items.length) %
                            props.items.length
                    ]
                if (next) {
                    props.onSelect(next.key)
                    requestAnimationFrame(() =>
                        root
                            ?.querySelector<HTMLElement>(
                                `[data-key="${next.key}"]`
                            )
                            ?.focus()
                    )
                }
            }}
        >
            <For each={props.items}>
                {(item) => (
                    <button
                        type="button"
                        role="option"
                        data-key={item.key}
                        aria-selected={
                            item.key === props.selected
                        }
                        tabIndex={
                            item.key === props.selected
                                ? 0
                                : -1
                        }
                        onClick={() =>
                            props.onSelect(item.key)
                        }
                        class={cn(
                            "flex h-11 shrink-0 snap-center items-center justify-center rounded-xl text-title3 tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                            item.key === props.selected
                                ? "bg-fill font-semibold text-label"
                                : "text-label-secondary hover:bg-fill/60"
                        )}
                    >
                        {item.text}
                    </button>
                )}
            </For>
        </div>
    )
}
