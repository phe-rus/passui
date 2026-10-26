import {
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
} from "solid-js"
import { getNativeLanguageName } from "../../lib/language"
import { cn } from "../../lib/class-names"
type Anchor = {
    side: "left" | "right"
    edge: "top" | "bottom"
    x: number
    y: number
}
export type LocaleSwitcherProps<L extends string> = {
    locales: readonly L[]
    locale: L
    onSelect: (locale: L) => void
    storageKey: string
    label: string
}
export function LocaleSwitcher<L extends string>(
    props: LocaleSwitcherProps<L>
) {
    const [open, setOpen] = createSignal(false),
        [anchor, setAnchor] = createSignal<Anchor>({
            side: "right",
            edge: "bottom",
            x: 20,
            y: 20,
        }),
        [offset, setOffset] = createSignal({ x: 0, y: 0 })
    let root!: HTMLDivElement,
        start: { x: number; y: number } | undefined,
        dragged = false
    onMount(() => {
        try {
            const next = JSON.parse(
                localStorage.getItem(props.storageKey) ??
                    "null"
            ) as Anchor | null
            if (
                next &&
                ["left", "right"].includes(next.side) &&
                ["top", "bottom"].includes(next.edge) &&
                Number.isFinite(next.x) &&
                Number.isFinite(next.y)
            )
                setAnchor(next)
        } catch {}
        const outside = (event: PointerEvent) => {
            if (
                event.target instanceof Node &&
                !root.contains(event.target)
            )
                setOpen(false)
        }
        document.addEventListener("pointerdown", outside)
        onCleanup(() =>
            document.removeEventListener(
                "pointerdown",
                outside
            )
        )
    })
    function finish() {
        if (dragged) {
            const rect = root.getBoundingClientRect(),
                side =
                    rect.left + rect.width / 2 <
                    window.innerWidth / 2
                        ? "left"
                        : "right",
                edge =
                    rect.top + rect.height / 2 <
                    window.innerHeight / 2
                        ? "top"
                        : "bottom"
            const next: Anchor = {
                side,
                edge,
                x: Math.max(
                    8,
                    Math.min(
                        side === "left"
                            ? rect.left
                            : window.innerWidth - rect.right,
                        window.innerWidth - rect.width - 8
                    )
                ),
                y: Math.max(
                    8,
                    Math.min(
                        edge === "top"
                            ? rect.top
                            : window.innerHeight -
                                  rect.bottom,
                        window.innerHeight - rect.height - 8
                    )
                ),
            }
            setAnchor(next)
            try {
                localStorage.setItem(
                    props.storageKey,
                    JSON.stringify(next)
                )
            } catch {}
        }
        setOffset({ x: 0, y: 0 })
        start = undefined
    }
    return (
        <div
            ref={root}
            class="fixed z-60"
            style={{
                [anchor().side]: `${anchor().x}px`,
                [anchor().edge]: `${anchor().y}px`,
                transform: `translate(${offset().x}px, ${offset().y}px)`,
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape") setOpen(false)
            }}
        >
            <div
                class={cn(
                    "glass-menu flex overflow-hidden rounded-2xl",
                    anchor().edge === "bottom"
                        ? "flex-col-reverse"
                        : "flex-col",
                    open() ? "w-40 gap-px p-1" : "size-10"
                )}
            >
                <button
                    type="button"
                    aria-label={props.label}
                    aria-expanded={open()}
                    class={cn(
                        "flex shrink-0 touch-none cursor-grab items-center justify-center text-caption font-semibold active:cursor-grabbing",
                        open()
                            ? "h-9 w-full rounded-lg hover:bg-fill"
                            : "size-10"
                    )}
                    onPointerDown={(event) => {
                        if (event.button !== 0) return
                        start = {
                            x: event.clientX,
                            y: event.clientY,
                        }
                        dragged = false
                        event.currentTarget.setPointerCapture(
                            event.pointerId
                        )
                    }}
                    onPointerMove={(event) => {
                        if (!start) return
                        const next = {
                            x: event.clientX - start.x,
                            y: event.clientY - start.y,
                        }
                        if (Math.hypot(next.x, next.y) > 5)
                            dragged = true
                        if (dragged) setOffset(next)
                    }}
                    onPointerUp={finish}
                    onPointerCancel={() => {
                        setOffset({ x: 0, y: 0 })
                        start = undefined
                    }}
                    onClick={() => {
                        if (!dragged)
                            setOpen((value) => !value)
                        dragged = false
                    }}
                >
                    {props.locale.toUpperCase()}
                </button>
                <Show when={open()}>
                    <div class="flex flex-col gap-px">
                        <For each={props.locales}>
                            {(locale) => (
                                <button
                                    type="button"
                                    aria-pressed={
                                        locale ===
                                        props.locale
                                    }
                                    class={cn(
                                        "rounded-sm px-2 py-1.5 text-start text-subheadline hover:bg-fill",
                                        locale ===
                                            props.locale &&
                                            "font-medium text-accent-text"
                                    )}
                                    onClick={() => {
                                        setOpen(false)
                                        if (
                                            locale !==
                                            props.locale
                                        )
                                            props.onSelect(
                                                locale
                                            )
                                    }}
                                >
                                    {getNativeLanguageName(
                                        locale
                                    )}
                                </button>
                            )}
                        </For>
                    </div>
                </Show>
            </div>
        </div>
    )
}
