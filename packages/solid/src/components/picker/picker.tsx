import {
    createEffect,
    createMemo,
    createSignal,
    createUniqueId,
    For,
    onCleanup,
    onMount,
    Show,
    type JSX,
} from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "../../lib/class-names"
import {
    placeInViewport,
    type AnchoredPlacement,
} from "../../lib/anchored-placement"
import {
    FLOATING_LAYER,
    registerFloatingLayer,
} from "../../lib/floating-layers"
import { haptic } from "../../lib/haptics"
import { screenEdges } from "../../lib/screen-edges"

export interface PickerOption<T extends string> {
    value: T
    label: string
    detail?: string
    lang?: string
}
export interface PickerProps<T extends string> {
    value: T
    options: readonly PickerOption<T>[]
    onChange: (value: T) => void
    label: string
    placeholder?: string
    searchable?: boolean
    searchPlaceholder?: string
    emptyLabel?: string
    className?: string
    class?: string
}
export function Picker<T extends string>(
    props: PickerProps<T>
) {
    const [open, setOpen] = createSignal(false)
    let trigger: HTMLButtonElement | undefined
    const id = createUniqueId()
    const selected = createMemo(() =>
        props.options.find(
            (option) => option.value === props.value
        )
    )
    const close = (refocus: boolean) => {
        setOpen(false)
        if (refocus) trigger?.focus()
    }
    return (
        <>
            <button
                ref={trigger}
                type="button"
                role="combobox"
                aria-label={props.label}
                aria-haspopup="listbox"
                aria-expanded={open()}
                aria-controls={open() ? id : undefined}
                onClick={() => setOpen((value) => !value)}
                onKeyDown={(event) => {
                    if (
                        event.key === "ArrowDown" ||
                        event.key === "ArrowUp"
                    ) {
                        event.preventDefault()
                        setOpen(true)
                    }
                }}
                class={cn(
                    "flex w-full min-w-0 items-center gap-2 rounded-lg control-field px-3 py-2 text-start text-subheadline text-label",
                    props.class,
                    props.className
                )}
            >
                <span
                    lang={selected()?.lang}
                    class={cn(
                        "min-w-0 grow truncate",
                        !selected() && "text-label-tertiary"
                    )}
                >
                    {selected()?.label ??
                        props.placeholder ??
                        ""}
                </span>
                <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="shrink-0 text-label-tertiary"
                >
                    <path d="m8 9 4-4 4 4m-8 6 4 4 4-4" />
                </svg>
            </button>
            <Show when={open() && trigger}>
                {(anchor) => (
                    <Portal>
                        <SelectList
                            {...props}
                            id={id}
                            anchor={anchor()}
                            close={close}
                        />
                    </Portal>
                )}
            </Show>
        </>
    )
}

function place(anchor: HTMLElement): AnchoredPlacement {
    const rect = anchor.getBoundingClientRect()
    const viewport = window.visualViewport
    const placed = placeInViewport(
        {
            anchor: rect,
            viewport: {
                width: viewport?.width ?? window.innerWidth,
                height:
                    viewport?.height ?? window.innerHeight,
            },
            edges: screenEdges(),
        },
        Math.min(Math.max(rect.width, 220), 360),
        240
    )
    return {
        ...placed,
        maxHeight: Math.min(placed.maxHeight ?? 420, 420),
    }
}

function SelectList<T extends string>(
    props: PickerProps<T> & {
        id: string
        anchor: HTMLElement
        close: (refocus: boolean) => void
    }
) {
    let root: HTMLDivElement | undefined
    let list: HTMLDivElement | undefined
    let search: HTMLInputElement | undefined
    const [placement, setPlacement] = createSignal(
        place(props.anchor)
    )
    const [query, setQuery] = createSignal("")
    const shown = createMemo(() => {
        const needle = query().trim().toLocaleLowerCase()
        return needle
            ? props.options.filter((option) =>
                  `${option.label} ${option.detail ?? ""} ${option.value}`
                      .toLocaleLowerCase()
                      .includes(needle)
              )
            : props.options
    })
    const [active, setActive] = createSignal(
        Math.max(
            0,
            props.options.findIndex(
                (option) => option.value === props.value
            )
        )
    )
    const activeOption = () =>
        shown()[Math.min(active(), shown().length - 1)]
    const searchable = () =>
        props.searchable ?? props.options.length > 10
    const pick = (value: T) => {
        props.close(true)
        if (value !== props.value) {
            haptic("selection")
            props.onChange(value)
        }
    }
    let typed = { text: "", at: 0 }
    onMount(() => {
        if (!root) return
        const unregister = registerFloatingLayer(
            root,
            props.anchor
        )
        onCleanup(unregister)
        if (searchable()) search?.focus()
        else list?.focus()
        const pointer = (event: PointerEvent) => {
            if (
                event.target instanceof Node &&
                !root?.contains(event.target) &&
                !props.anchor.contains(event.target)
            )
                props.close(false)
        }
        const replace = () =>
            setPlacement(place(props.anchor))
        const scroll = (event: Event) => {
            if (
                !(event.target instanceof Node) ||
                !root?.contains(event.target)
            )
                replace()
        }
        const blur = () => props.close(false)
        document.addEventListener(
            "pointerdown",
            pointer,
            true
        )
        window.addEventListener("scroll", scroll, true)
        window.addEventListener("resize", replace)
        window.visualViewport?.addEventListener(
            "resize",
            replace
        )
        window.visualViewport?.addEventListener(
            "scroll",
            replace
        )
        window.addEventListener("blur", blur)
        onCleanup(() => {
            document.removeEventListener(
                "pointerdown",
                pointer,
                true
            )
            window.removeEventListener("scroll", scroll, true)
            window.removeEventListener("resize", replace)
            window.visualViewport?.removeEventListener(
                "resize",
                replace
            )
            window.visualViewport?.removeEventListener(
                "scroll",
                replace
            )
            window.removeEventListener("blur", blur)
        })
    })
    createEffect(() => {
        const option = activeOption()
        if (option)
            list?.querySelector(
                `[data-value="${CSS.escape(option.value)}"]`
            )?.scrollIntoView({ block: "nearest" })
    })
    const key: JSX.EventHandler<
        HTMLDivElement,
        KeyboardEvent
    > = (event) => {
        const last = shown().length - 1
        const current = Math.min(active(), last)
        const step = (next: number) => {
            event.preventDefault()
            setActive(Math.max(0, Math.min(last, next)))
        }
        if (event.key === "ArrowDown") step(current + 1)
        else if (event.key === "ArrowUp") step(current - 1)
        else if (event.key === "Home" && !searchable())
            step(0)
        else if (event.key === "End" && !searchable())
            step(last)
        else if (event.key === "PageDown") step(current + 8)
        else if (event.key === "PageUp") step(current - 8)
        else if (
            event.key === "Enter" ||
            (event.key === " " && !searchable())
        ) {
            event.preventDefault()
            const option = activeOption()
            if (option) pick(option.value)
        } else if (event.key === "Escape") {
            event.preventDefault()
            event.stopPropagation()
            props.close(true)
        } else if (event.key === "Tab") props.close(false)
        else if (
            !searchable() &&
            event.key.length === 1 &&
            !event.metaKey &&
            !event.ctrlKey
        ) {
            const now = Date.now()
            const text =
                (now - typed.at < 700 ? typed.text : "") +
                event.key
            typed = { text, at: now }
            const match = shown().findIndex((option) =>
                option.label
                    .toLocaleLowerCase()
                    .startsWith(text.toLocaleLowerCase())
            )
            if (match >= 0) setActive(match)
        }
    }
    return (
        <div
            ref={root}
            {...{ [FLOATING_LAYER]: "" }}
            onKeyDown={key}
            class="glass-menu fixed z-[80] flex animate-in flex-col overflow-hidden rounded-3xl fade-in zoom-in-95 duration-normal motion-reduce:animate-none"
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
                "transform-origin": placement().above
                    ? "50% 100%"
                    : "50% 0%",
            }}
        >
            <Show when={searchable()}>
                <div class="flex shrink-0 items-center gap-2 border-b border-separator/70 px-3 py-2">
                    <input
                        ref={search}
                        value={query()}
                        placeholder={
                            props.searchPlaceholder ??
                            "Search"
                        }
                        aria-label={
                            props.searchPlaceholder ??
                            "Search"
                        }
                        aria-controls={props.id}
                        aria-activedescendant={
                            activeOption()
                                ? `${props.id}-${activeOption()?.value}`
                                : undefined
                        }
                        onInput={(event) => {
                            setQuery(
                                event.currentTarget.value
                            )
                            setActive(0)
                        }}
                        class="min-w-0 grow bg-transparent text-subheadline text-label outline-none placeholder:text-label-tertiary"
                    />
                </div>
            </Show>
            <div
                ref={list}
                id={props.id}
                role="listbox"
                aria-label={props.label}
                tabIndex={-1}
                aria-activedescendant={
                    activeOption()
                        ? `${props.id}-${activeOption()?.value}`
                        : undefined
                }
                class="no-scrollbar flex min-h-0 flex-col overflow-y-auto overscroll-contain p-1.5 outline-none"
            >
                <For each={shown()}>
                    {(option, index) => (
                        <div
                            id={`${props.id}-${option.value}`}
                            data-value={option.value}
                            role="option"
                            tabIndex={-1}
                            aria-selected={
                                option.value === props.value
                            }
                            lang={option.lang}
                            onPointerMove={() =>
                                setActive(index())
                            }
                            onClick={() => pick(option.value)}
                            class={cn(
                                "flex min-h-8 cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-subheadline [@media(pointer:coarse)]:min-h-11",
                                option === activeOption() &&
                                    "bg-fill",
                                option.value === props.value
                                    ? "font-semibold text-label"
                                    : "text-label"
                            )}
                        >
                            <span class="flex w-4 shrink-0 justify-center">
                                <Show
                                    when={
                                        option.value ===
                                        props.value
                                    }
                                >
                                    <svg
                                        aria-hidden="true"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2.4"
                                        class="text-accent-text"
                                    >
                                        <path d="m5 12 4 4 10-10" />
                                    </svg>
                                </Show>
                            </span>
                            <span class="min-w-0 grow break-words">
                                {option.label}
                            </span>
                            <Show when={option.detail}>
                                <span class="shrink-0 text-caption font-normal text-label-tertiary">
                                    {option.detail}
                                </span>
                            </Show>
                        </div>
                    )}
                </For>
                <Show when={shown().length === 0}>
                    <p class="px-3 py-2 text-footnote text-label-tertiary">
                        {props.emptyLabel ?? "No matches"}
                    </p>
                </Show>
            </div>
        </div>
    )
}
