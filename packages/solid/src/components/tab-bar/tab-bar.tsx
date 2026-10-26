import { For, Show, onCleanup, type JSX } from "solid-js"
import { useMinimizeOnScroll } from "../../hooks/use-minimize-on-scroll"
import { usePlatform } from "../../appearance/platform"
import { cn } from "../../lib/class-names"
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
    const minimized = () =>
        scrolledAway() &&
        props.active !== null &&
        props.minimizeBehavior !== "never" &&
        (props.minimizeBehavior === "scroll" ||
            usePlatform() !== "android")
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
                    "glass flex min-w-0 items-center rounded-full p-0.5 motion-safe:transition-all",
                    minimized() ? "grow-0" : "grow"
                )}
            >
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
                                        "relative isolate flex h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-full font-semibold text-[10px] tracking-[0.01em] no-underline motion-safe:transition-[color,transform] duration-fast active:scale-[0.94]",
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
                                            <Show
                                                when={
                                                    tab.id ===
                                                    props.active
                                                }
                                            >
                                                <span class="glass-lens absolute inset-0 -z-10 rounded-full" />
                                            </Show>
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
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            aria-hidden="true"
                        >
                            <circle
                                cx="10.5"
                                cy="10.5"
                                r="7.5"
                            />
                            <path d="m16 16 5 5" />
                        </svg>
                    </button>
                )}
            </Show>
        </nav>
    )
}
