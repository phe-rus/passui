import {
    createEffect,
    createSignal,
    createUniqueId,
    For,
    onMount,
    onCleanup,
    Show,
} from "solid-js"
import { springs } from "@passui/tokens/motion"
import { Portal } from "solid-js/web"
import { cn } from "../../lib/class-names"
import { useSpringValue } from "../../hooks/use-spring-value"
import {
    getToasts,
    subscribeToasts,
    toast,
    toastLimits,
    type Toast,
} from "./toast-store"
export function Toaster(props: {
    className?: string
    label?: string
}) {
    const [items, setItems] = createSignal<Toast[]>([]),
        [rendered, setRendered] = createSignal<Toast[]>([]),
        [hovered, setHovered] = createSignal(false)
    const removalTimers = new Map<
        number,
        ReturnType<typeof setTimeout>
    >()
    onMount(() => {
        const sync = () => {
            const next = getToasts().slice(
                0,
                toastLimits.visible
            )
            setItems(next)
            setRendered((previous) => {
                const byId = new Map(
                    previous.map((item) => [item.id, item])
                )
                for (const item of next)
                    byId.set(item.id, item)
                return [...byId.values()]
            })
            for (const item of next) {
                const timer = removalTimers.get(item.id)
                if (timer) clearTimeout(timer)
                removalTimers.delete(item.id)
            }
            for (const item of rendered()) {
                if (
                    next.some(
                        (active) => active.id === item.id
                    ) ||
                    removalTimers.has(item.id)
                )
                    continue
                removalTimers.set(
                    item.id,
                    setTimeout(() => {
                        setRendered((previous) =>
                            previous.filter(
                                (entry) =>
                                    entry.id !== item.id
                            )
                        )
                        removalTimers.delete(item.id)
                    }, 280)
                )
            }
        }
        sync()
        const unsubscribe = subscribeToasts(sync)
        onCleanup(() => {
            unsubscribe()
            for (const timer of removalTimers.values())
                clearTimeout(timer)
        })
    })
    return (
        <Portal>
            <section
                aria-label={props.label ?? "Notifications"}
                aria-live="polite"
                class={cn(
                    "pointer-events-none fixed inset-x-0 top-[max(10px,env(safe-area-inset-top))] z-[60] flex justify-center px-3",
                    props.className
                )}
            >
                <ol
                    class="relative flex w-full max-w-[420px] flex-col items-center"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocusIn={() => setHovered(true)}
                    onFocusOut={() => setHovered(false)}
                >
                    <For each={rendered()}>
                        {(item) => (
                            <ToastItem
                                item={item}
                                index={items().findIndex(
                                    (active) =>
                                        active.id === item.id
                                )}
                                visible={items().some(
                                    (active) =>
                                        active.id === item.id
                                )}
                                paused={hovered()}
                            />
                        )}
                    </For>
                </ol>
            </section>
        </Portal>
    )
}
function ToastItem(props: {
    item: Toast
    index: number
    visible: boolean
    paused: boolean
}) {
    const id = `passui-toast-${createUniqueId()}`
    const [open, setOpen] = createSignal(false),
        [size, setSize] = createSignal({
            width: 40,
            height: 40,
        })
    let content!: HTMLDivElement,
        dragY = 0
    const vertical = useSpringValue(-24, springs.bouncy)
    const layerScale = useSpringValue(0.6, springs.bouncy)
    const layerOpacity = useSpringValue(0, springs.snappy)
    const bodySpring = {
        stiffness: 400,
        damping: 30,
        mass: 0.8,
    }
    const widthSpring = useSpringValue(40, bodySpring)
    const heightSpring = useSpringValue(40, bodySpring)
    onMount(() => {
        vertical.jump(-24)
        layerScale.jump(0.6)
        layerOpacity.jump(0)
        vertical.to(0)
        layerScale.to(1)
        layerOpacity.to(1)
        const timer = setTimeout(() => setOpen(true), 140)
        const measure = () =>
            setSize({
                width: Math.ceil(content.offsetWidth),
                height: Math.ceil(content.offsetHeight),
            })
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(content)
        onCleanup(() => {
            clearTimeout(timer)
            observer.disconnect()
        })
    })
    createEffect(() => {
        const item = props.item
        if (item.duration === null || props.paused) return
        const timer = setTimeout(
            () => toast.dismiss(item.id),
            item.duration
        )
        onCleanup(() => clearTimeout(timer))
    })
    const width = () => (open() ? size().width : 40),
        height = () => (open() ? size().height : 40)
    createEffect(() => {
        const index = Math.max(0, props.index)
        const active = props.visible
        const grouped = !props.paused && index > 0
        vertical.to(
            active
                ? grouped
                    ? index * 9
                    : index * (size().height + 14)
                : -24
        )
        layerScale.to(
            active ? (grouped ? 1 - index * 0.05 : 1) : 0.85
        )
        layerOpacity.to(
            active ? (grouped ? 1 - index * 0.25 : 1) : 0
        )
    })
    createEffect(() => {
        widthSpring.to(width())
        heightSpring.to(height())
    })
    return (
        <li
            class="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
            style={{
                "z-index": 10 - Math.max(0, props.index),
                opacity: layerOpacity.value(),
                transform: `translateY(${vertical.value()}px) scale(${layerScale.value()})`,
            }}
        >
            <div
                role="status"
                class="pointer-events-auto relative"
                style={{
                    width: `${widthSpring.value()}px`,
                    height: `${heightSpring.value()}px`,
                }}
                onPointerDown={(event) => {
                    dragY = event.clientY
                    event.currentTarget.setPointerCapture(
                        event.pointerId
                    )
                }}
                onPointerUp={(event) => {
                    if (event.clientY - dragY < -30)
                        toast.dismiss(props.item.id)
                }}
            >
                <svg
                    aria-hidden="true"
                    class="pointer-events-none absolute size-0"
                >
                    <defs>
                        <filter id={id}>
                            <feGaussianBlur
                                in="SourceGraphic"
                                stdDeviation="7"
                                result="blur"
                            />
                            <feColorMatrix
                                in="blur"
                                type="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
                                result="goo"
                            />
                            <feComposite
                                in="SourceGraphic"
                                in2="goo"
                                operator="atop"
                            />
                        </filter>
                    </defs>
                </svg>
                <div
                    aria-hidden="true"
                    class="absolute -inset-3"
                    style={{ filter: `url(#${id})` }}
                >
                    <span class="absolute top-3 left-3 size-10 rounded-full bg-inverse shadow-xl" />
                    <span
                        class="absolute top-3 left-3 bg-inverse"
                        style={{
                            width: `${widthSpring.value()}px`,
                            height: `${heightSpring.value()}px`,
                            "border-radius": `${Math.min(20, heightSpring.value() / 2)}px`,
                        }}
                    />
                </div>
                <div
                    ref={content}
                    class="absolute top-0 left-0 flex w-max max-w-[min(420px,calc(100vw-24px))] items-start gap-2.5 py-[10px] pr-4 pl-[10px] text-on-inverse motion-safe:transition-opacity"
                    style={{
                        "min-height": "40px",
                        opacity: open() ? 1 : 0,
                    }}
                >
                    <span
                        aria-hidden="true"
                        class={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full",
                            props.item.tone === "success"
                                ? "bg-success text-white"
                                : props.item.tone === "error"
                                  ? "bg-danger text-white"
                                  : "bg-on-inverse/15"
                        )}
                    >
                        <Show
                            when={
                                props.item.tone !== "loading"
                            }
                            fallback={
                                <span class="size-3 animate-spin rounded-full border-2 border-current border-r-transparent" />
                            }
                        >
                            {props.item.tone === "success"
                                ? "✓"
                                : props.item.tone === "error"
                                  ? "×"
                                  : "•"}
                        </Show>
                    </span>
                    <div class="flex min-w-0 flex-col py-px">
                        <span class="text-subheadline leading-5 font-semibold">
                            {props.item.title}
                        </span>
                        <Show when={props.item.description}>
                            <span class="text-footnote leading-snug text-on-inverse/70">
                                {props.item.description}
                            </span>
                        </Show>
                    </div>
                    <Show when={props.item.action}>
                        {(action) => (
                            <button
                                type="button"
                                class="ml-1 shrink-0 self-center rounded-full bg-on-inverse/12 px-3 py-1 text-footnote font-semibold text-on-inverse hover:bg-on-inverse/20"
                                onClick={() => {
                                    action().onClick()
                                    toast.dismiss(
                                        props.item.id
                                    )
                                }}
                            >
                                {action().label}
                            </button>
                        )}
                    </Show>
                </div>
            </div>
        </li>
    )
}
