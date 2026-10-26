/** @jsxImportSource solid-js */
import {
    createEffect,
    createSignal,
    createUniqueId,
    For,
    onMount,
    onCleanup,
    Show,
} from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "../../lib/class-names"
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
        [hovered, setHovered] = createSignal(false)
    onMount(() => {
        setItems(getToasts())
        onCleanup(
            subscribeToasts(() => setItems(getToasts()))
        )
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
                    <For
                        each={items().slice(
                            0,
                            toastLimits.visible
                        )}
                    >
                        {(item, index) => (
                            <ToastItem
                                item={item}
                                index={index()}
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
    onMount(() => {
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
    const stacked = () => !props.paused && props.index > 0
    const width = () => (open() ? size().width : 40),
        height = () => (open() ? size().height : 40)
    return (
        <li
            class="pointer-events-none absolute inset-x-0 top-0 flex justify-center motion-safe:transition-all"
            style={{
                "z-index": 10 - props.index,
                opacity: stacked()
                    ? 1 - props.index * 0.25
                    : 1,
                transform: `translateY(${stacked() ? props.index * 9 : props.index * (size().height + 14)}px) scale(${stacked() ? 1 - props.index * 0.05 : 1})`,
            }}
        >
            <div
                role="status"
                class="pointer-events-auto relative motion-safe:transition-all motion-safe:duration-300"
                style={{
                    width: `${width()}px`,
                    height: `${height()}px`,
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
                        class="absolute top-3 left-3 bg-inverse motion-safe:transition-all motion-safe:duration-300"
                        style={{
                            width: `${width()}px`,
                            height: `${height()}px`,
                            "border-radius": `${Math.min(20, height() / 2)}px`,
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
