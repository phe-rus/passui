import {
    createEffect,
    createSignal,
    For,
    onMount,
    Show,
    onCleanup,
    type JSX,
} from "solid-js"
import { springs } from "@passui/tokens/motion"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../icons/hugeicon"
import { useMinimizeOnScroll } from "../../hooks/use-minimize-on-scroll"
import { usePlatform } from "../../appearance/platform"
import { cn } from "../../lib/class-names"
import { useSpringValue } from "../../hooks/use-spring-value"
export interface TabBarTab<Id extends string = string> {
    id: Id
    label: string
    icon: JSX.Element
}
export interface TabBarLinkProps {
    className: string
    "aria-current": "page" | undefined
    onClick: () => void
    children: JSX.Element
}
export function TabBar<Tab extends TabBarTab>(props: {
    tabs: readonly Tab[]
    active: Tab["id"] | null
    renderLink: (
        tab: Tab,
        props: TabBarLinkProps
    ) => JSX.Element
    search?: { label: string; onPress: () => void }
    label: string
    className?: string
    class?: string
    minimizeBehavior?: "platform" | "scroll" | "never"
}) {
    const [scrolledAway, setScrolledAway] =
        useMinimizeOnScroll()
    const selectionX = useSpringValue(0, springs.snappy)
    const selectionWidth = useSpringValue(0, springs.snappy)
    const [selectionReady, setSelectionReady] =
        createSignal(false)
    let bar: HTMLDivElement | undefined
    const minimized = () =>
        scrolledAway() &&
        props.active !== null &&
        props.minimizeBehavior !== "never" &&
        (props.minimizeBehavior === "scroll" ||
            usePlatform() !== "android")
    const measureSelection = (immediate = false) => {
        const selected = bar?.querySelector<HTMLElement>(
            '[aria-current="page"]'
        )
        if (!selected || !bar) {
            setSelectionReady(false)
            return
        }
        const container = bar.getBoundingClientRect()
        const rect = selected.getBoundingClientRect()
        const x = rect.left - container.left
        if (immediate) {
            selectionX.jump(x)
            selectionWidth.jump(rect.width)
        } else {
            selectionX.to(x)
            selectionWidth.to(rect.width)
        }
        setSelectionReady(true)
    }
    onMount(() => {
        measureSelection(true)
        const observer = new ResizeObserver(() =>
            measureSelection()
        )
        if (bar) observer.observe(bar)
        const onResize = () => measureSelection()
        window.addEventListener("resize", onResize)
        onCleanup(() => {
            observer.disconnect()
            window.removeEventListener("resize", onResize)
        })
    })
    createEffect(() => {
        void props.active
        minimized()
        queueMicrotask(() => measureSelection())
    })
    return (
        <nav
            aria-label={props.label}
            class={cn(
                "fixed inset-x-4 bottom-[max(14px,env(safe-area-inset-bottom))] z-30 flex items-center gap-3",
                props.class,
                props.className
            )}
        >
            <div
                ref={(element) => {
                    bar = element
                    const restore = (event: MouseEvent) => {
                        if (minimized()) {
                            event.preventDefault()
                            event.stopPropagation()
                            setScrolledAway(false)
                        }
                    }
                    element.addEventListener(
                        "click",
                        restore,
                        true
                    )
                    onCleanup(() =>
                        element.removeEventListener(
                            "click",
                            restore,
                            true
                        )
                    )
                }}
                class={cn(
                    "glass relative isolate flex min-w-0 items-center rounded-full p-0.5 motion-safe:transition-all",
                    minimized() ? "grow-0" : "grow"
                )}
            >
                <span
                    aria-hidden="true"
                    class="glass-lens pointer-events-none absolute inset-y-0.5 left-0 z-0 rounded-full"
                    style={{
                        opacity: selectionReady() ? 1 : 0,
                        transform: `translateX(${selectionX.value()}px)`,
                        width: `${selectionWidth.value()}px`,
                    }}
                />
                <For each={props.tabs}>
                    {(tab) => (
                        <Show
                            when={
                                !minimized() ||
                                tab.id === props.active
                            }
                        >
                            {props.renderLink(tab, {
                                get "aria-current"() {
                                    return tab.id ===
                                        props.active
                                        ? "page"
                                        : undefined
                                },
                                onClick: () => {},
                                get className() {
                                    return cn(
                                        "relative z-10 flex h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-full font-semibold text-[10px] tracking-[0.01em] no-underline motion-safe:transition-[color,transform] duration-fast active:scale-[0.94]",
                                        minimized()
                                            ? "w-11"
                                            : "flex-1 px-1",
                                        tab.id ===
                                            props.active
                                            ? "text-accent-text"
                                            : "text-label-secondary"
                                    )
                                },
                                get children() {
                                    return (
                                        <>
                                            {tab.icon}
                                            <Show
                                                when={
                                                    !minimized()
                                                }
                                            >
                                                <span class="max-w-full truncate">
                                                    {
                                                        tab.label
                                                    }
                                                </span>
                                            </Show>
                                        </>
                                    )
                                },
                            })}
                        </Show>
                    )}
                </For>
            </div>
            <Show when={props.search}>
                {(search) => (
                    <button
                        type="button"
                        aria-label={search().label}
                        onClick={() => search().onPress()}
                        class="glass ms-auto flex size-12 shrink-0 items-center justify-center rounded-full text-label motion-safe:transition-transform duration-fast active:scale-[0.92]"
                    >
                        <Hugeicon
                            icon={Search01Icon}
                            size={19}
                            strokeWidth={2}
                        />
                    </button>
                )}
            </Show>
        </nav>
    )
}
