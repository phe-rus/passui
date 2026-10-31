import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react"
import {
    type KeyboardEvent,
    useCallback,
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
    CheckIcon,
    SearchIcon,
    SelectorIcon,
} from "../../icons/icons"
import { cn } from "../../lib/class-names"
import {
    type AnchoredPlacement,
    placeInViewport,
} from "../../lib/anchored-placement"
import { registerFloatingLayer } from "../../lib/floating-layers"
import { haptic } from "../../lib/haptics"
import { screenEdges } from "../../lib/screen-edges"
import { floatingPanelMotion } from "../../motion/transitions"

export interface PickerOption<T extends string> {
    value: T
    label: string
    /** A quieter second line or trailing note, such as "Free" or a region. */
    detail?: string
    /** The option's own language, so it is spoken and shaped right. */
    lang?: string
}

/** Values and callbacks share the option value type, including literal unions. */
export interface PickerProps<T extends string> {
    /** The selected option's value. */
    value: T
    /** Available choices. Use a literal union for a fixed set of values. */
    options: ReadonlyArray<PickerOption<T>>
    /** Called with the selected option value. */
    onChange: (value: NoInfer<T>) => void
    /** Accessible name for the trigger. */
    label: string
    /** Shown when the selected value has no matching option. */
    placeholder?: string
    /** Defaults to on for lists of ten or more options. */
    searchable?: boolean
    /** Label for the filter field. @default "Search" */
    searchPlaceholder?: string
    /** Shown when the filter matches nothing. @default "No matches" */
    emptyLabel?: string
    className?: string
}

/** Long lists get a filter field, as in the system pickers. */
const SEARCH_FROM = 10

/**
 * A pop-up button: shows the chosen value and opens a list that floats
 * above everything, flips upward near the bottom edge and filters long
 * lists. Replaces the browser's own select, which looks foreign on every
 * platform.
 */
export function Picker<T extends string>({
    value,
    options,
    onChange,
    label,
    placeholder,
    searchable,
    searchPlaceholder = "Search",
    emptyLabel = "No matches",
    className,
}: PickerProps<T>) {
    const [open, setOpen] = useState(false)
    const trigger = useRef<HTMLButtonElement>(null)
    const listId = useId()
    const selected = options.find(
        (option) => option.value === value
    )

    const close = useCallback((refocus: boolean) => {
        setOpen(false)
        if (refocus) trigger.current?.focus()
    }, [])

    const onTriggerKey = (
        event: KeyboardEvent<HTMLButtonElement>
    ) => {
        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowUp"
        ) {
            event.preventDefault()
            setOpen(true)
        }
    }

    return (
        <>
            <button
                ref={trigger}
                type="button"
                role="combobox"
                aria-label={label}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={open ? listId : undefined}
                onClick={() => setOpen((current) => !current)}
                onKeyDown={onTriggerKey}
                className={cn(
                    "flex w-full min-w-0 items-center gap-2 rounded-lg control-field px-3 py-2 text-start text-subheadline text-label",
                    className
                )}
            >
                <span
                    lang={selected?.lang}
                    className={cn(
                        "min-w-0 grow truncate",
                        !selected && "text-label-tertiary"
                    )}
                >
                    {selected?.label ?? placeholder ?? ""}
                </span>
                <SelectorIcon
                    size={15}
                    strokeWidth={2}
                    className="shrink-0 text-label-tertiary"
                />
            </button>
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {open && trigger.current && (
                            <SelectList
                                id={listId}
                                anchor={trigger.current}
                                options={options}
                                value={value}
                                label={label}
                                searchable={
                                    searchable ??
                                    options.length >
                                        SEARCH_FROM
                                }
                                searchPlaceholder={
                                    searchPlaceholder
                                }
                                emptyLabel={emptyLabel}
                                onPick={(next) => {
                                    close(true)
                                    if (next === value) return
                                    haptic("selection")
                                    onChange(next)
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

function place(anchor: HTMLElement): AnchoredPlacement {
    const rect = anchor.getBoundingClientRect()
    const viewport = window.visualViewport
    const frame = {
        anchor: {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
        },
        viewport: {
            width: viewport?.width ?? window.innerWidth,
            height: viewport?.height ?? window.innerHeight,
        },
        edges: screenEdges(),
    }
    const width = Math.min(Math.max(rect.width, 220), 360)
    const placed = placeInViewport(frame, width, 240)
    // Long lists scroll rather than stretch past 420 px.
    return {
        ...placed,
        maxHeight: Math.min(placed.maxHeight ?? 420, 420),
    }
}

function SelectList<T extends string>({
    id,
    anchor,
    options,
    value,
    label,
    searchable,
    searchPlaceholder,
    emptyLabel,
    onPick,
    onClose,
}: {
    id: string
    anchor: HTMLElement
    options: ReadonlyArray<PickerOption<T>>
    value: T
    label: string
    searchable: boolean
    searchPlaceholder: string
    emptyLabel: string
    onPick: (value: T) => void
    onClose: (refocus: boolean) => void
}) {
    const root = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const list = useRef<HTMLDivElement>(null)
    const search = useRef<HTMLInputElement>(null)
    const [placement, setPlacement] = useState(() =>
        place(anchor)
    )
    const [query, setQuery] = useState("")
    const typed = useRef({ text: "", at: 0 })

    const shown = useMemo(() => {
        const needle = query.trim().toLocaleLowerCase()
        if (!needle) return options
        return options.filter((option) =>
            `${option.label} ${option.detail ?? ""} ${option.value}`
                .toLocaleLowerCase()
                .includes(needle)
        )
    }, [options, query])

    const [active, setActive] = useState(() =>
        Math.max(
            0,
            options.findIndex(
                (option) => option.value === value
            )
        )
    )
    const activeOption =
        shown[Math.min(active, shown.length - 1)]

    useLayoutEffect(() => {
        if (!root.current) return
        const unregister = registerFloatingLayer(
            root.current,
            anchor
        )
        if (searchable) search.current?.focus()
        else list.current?.focus()
        return unregister
    }, [searchable, anchor])

    // The chosen option starts in view, then follows the keyboard.
    useEffect(() => {
        if (!activeOption) return
        list.current
            ?.querySelector(
                `[data-value="${CSS.escape(activeOption.value)}"]`
            )
            ?.scrollIntoView({ block: "nearest" })
    }, [activeOption])

    useEffect(() => {
        const onPointer = (event: PointerEvent) => {
            const target = event.target as Node
            if (
                !root.current?.contains(target) &&
                !anchor.contains(target)
            )
                onClose(false)
        }
        const onScroll = (event: Event) => {
            if (!root.current?.contains(event.target as Node))
                setPlacement(place(anchor))
        }
        const onResize = () => setPlacement(place(anchor))
        const onBlur = () => onClose(false)
        document.addEventListener(
            "pointerdown",
            onPointer,
            true
        )
        window.addEventListener("scroll", onScroll, true)
        window.addEventListener("resize", onResize)
        window.visualViewport?.addEventListener(
            "resize",
            onResize
        )
        window.addEventListener("blur", onBlur)
        return () => {
            document.removeEventListener(
                "pointerdown",
                onPointer,
                true
            )
            window.removeEventListener(
                "scroll",
                onScroll,
                true
            )
            window.removeEventListener("resize", onResize)
            window.visualViewport?.removeEventListener(
                "resize",
                onResize
            )
            window.removeEventListener("blur", onBlur)
        }
    }, [anchor, onClose])

    const onKeyDown = (event: KeyboardEvent) => {
        const last = shown.length - 1
        const step = (to: number) => {
            event.preventDefault()
            setActive(Math.max(0, Math.min(last, to)))
        }
        const current = Math.min(active, last)
        if (event.key === "ArrowDown") step(current + 1)
        else if (event.key === "ArrowUp") step(current - 1)
        else if (event.key === "Home" && !searchable) step(0)
        else if (event.key === "End" && !searchable)
            step(last)
        else if (event.key === "PageDown") step(current + 8)
        else if (event.key === "PageUp") step(current - 8)
        else if (
            event.key === "Enter" ||
            (event.key === " " && !searchable)
        ) {
            event.preventDefault()
            if (activeOption) onPick(activeOption.value)
        } else if (event.key === "Escape") {
            event.preventDefault()
            event.stopPropagation()
            onClose(true)
        } else if (event.key === "Tab") {
            onClose(false)
        } else if (
            !searchable &&
            event.key.length === 1 &&
            !event.metaKey &&
            !event.ctrlKey
        ) {
            // Type to jump, as in a native pop-up button.
            const now = Date.now()
            const text =
                (now - typed.current.at < 700
                    ? typed.current.text
                    : "") + event.key
            typed.current = { text, at: now }
            const match = shown.findIndex((option) =>
                option.label
                    .toLocaleLowerCase()
                    .startsWith(text.toLocaleLowerCase())
            )
            if (match >= 0) setActive(match)
        }
    }

    return (
        <motion.div
            ref={root}
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
                transformOrigin: placement.above
                    ? "50% 100%"
                    : "50% 0%",
            }}
            className="glass-menu fixed z-[80] flex flex-col overflow-hidden rounded-3xl"
            {...{ [FLOATING_LAYER]: "" }}
            onKeyDown={onKeyDown}
        >
            {searchable && (
                <div className="flex shrink-0 items-center gap-2 border-b border-separator/70 px-3 py-2">
                    <SearchIcon
                        size={15}
                        className="shrink-0 text-label-tertiary"
                    />
                    <input
                        ref={search}
                        value={query}
                        placeholder={searchPlaceholder}
                        aria-label={searchPlaceholder}
                        aria-controls={id}
                        aria-activedescendant={
                            activeOption
                                ? `${id}-${activeOption.value}`
                                : undefined
                        }
                        onChange={(event) => {
                            setQuery(event.target.value)
                            setActive(0)
                        }}
                        className="min-w-0 grow bg-transparent text-subheadline text-label outline-none placeholder:text-label-tertiary"
                    />
                </div>
            )}
            <div
                ref={list}
                id={id}
                role="listbox"
                aria-label={label}
                tabIndex={-1}
                aria-activedescendant={
                    activeOption
                        ? `${id}-${activeOption.value}`
                        : undefined
                }
                className="no-scrollbar flex min-h-0 flex-col overflow-y-auto overscroll-contain p-1.5 outline-none"
            >
                {shown.map((option, index) => {
                    const chosen = option.value === value
                    const focused = option === activeOption
                    return (
                        <div
                            key={option.value}
                            id={`${id}-${option.value}`}
                            data-value={option.value}
                            role="option"
                            tabIndex={-1}
                            aria-selected={chosen}
                            lang={option.lang}
                            onPointerMove={() =>
                                setActive(index)
                            }
                            onClick={() =>
                                onPick(option.value)
                            }
                            className={cn(
                                "flex min-h-8 cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-subheadline [@media(pointer:coarse)]:min-h-11",
                                focused ? "bg-fill" : "",
                                chosen
                                    ? "font-semibold text-label"
                                    : "text-label"
                            )}
                        >
                            <span className="flex w-4 shrink-0 justify-center">
                                {chosen && (
                                    <CheckIcon
                                        size={15}
                                        strokeWidth={2.4}
                                        className="text-accent-text"
                                    />
                                )}
                            </span>
                            <span className="min-w-0 grow break-words">
                                {option.label}
                            </span>
                            {option.detail && (
                                <span className="shrink-0 text-caption font-normal text-label-tertiary">
                                    {option.detail}
                                </span>
                            )}
                        </div>
                    )
                })}
                {shown.length === 0 && (
                    <p className="px-3 py-2 text-footnote text-label-tertiary">
                        {emptyLabel}
                    </p>
                )}
            </div>
        </motion.div>
    )
}
