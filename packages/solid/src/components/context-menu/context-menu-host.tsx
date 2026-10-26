/** @jsxImportSource solid-js */
import {
    createSignal,
    For,
    onMount,
    onCleanup,
    Show,
} from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "../../lib/class-names"
import { screenEdges } from "../../lib/screen-edges"
import { registerFloatingLayer } from "../../lib/floating-layers"
import { concealMenuSource } from "./conceal-menu-source"
import { menuPosition } from "./menu-position"
import { menuReveal, toolbarMenuReveal } from "./menu-reveal"
import {
    getContextMenu,
    subscribeContextMenu,
    closeContextMenu,
    type OpenMenu,
} from "./context-menu-store"
export function ContextMenuHost() {
    const [menu, setMenu] = createSignal<OpenMenu | null>(
        null
    )
    onMount(() => {
        setMenu(getContextMenu())
        onCleanup(
            subscribeContextMenu(() =>
                setMenu(getContextMenu())
            )
        )
    })
    return (
        <Show when={menu()} keyed>
            {(value) => (
                <Portal>
                    <Menu menu={value} />
                </Portal>
            )}
        </Show>
    )
}
function Menu(props: { menu: OpenMenu }) {
    let root!: HTMLDivElement
    const [position, setPosition] = createSignal({
        left: props.menu.x,
        top: props.menu.y,
        maxHeight: 0,
        width: 0,
        height: 0,
        originX: 0,
        originY: 0,
    })
    const controls = () =>
        Array.from(
            root.querySelectorAll<HTMLButtonElement>(
                'button[role^="menuitem"]:not(:disabled)'
            )
        )
    onMount(() => {
        const viewport = window.visualViewport
        function refit() {
            const edges = screenEdges(),
                left = viewport?.offsetLeft ?? 0,
                top = viewport?.offsetTop ?? 0
            setPosition(
                menuPosition(
                    props.menu,
                    {
                        width: root.offsetWidth,
                        height: root.scrollHeight,
                    },
                    {
                        left: left + edges.left,
                        top: top + edges.top,
                        right:
                            left +
                            (viewport?.width ??
                                window.innerWidth) -
                            edges.right,
                        bottom:
                            top +
                            (viewport?.height ??
                                window.innerHeight) -
                            edges.bottom,
                    }
                )
            )
        }
        refit()
        const unregister = props.menu.anchor
            ? registerFloatingLayer(root, props.menu.anchor)
            : () => {}
        const source = props.menu.toolbar ?? props.menu.anchor
        const restore =
            (props.menu.source || props.menu.toolbar) &&
            source instanceof HTMLElement
                ? concealMenuSource(
                      source,
                      Boolean(props.menu.toolbar)
                  )
                : () => false
        if (
            !matchMedia("(prefers-reduced-motion: reduce)")
                .matches
        ) {
            const target = position(),
                reveal = menuReveal(props.menu.source, target)
            const frames =
                props.menu.toolbarRect && props.menu.source
                    ? toolbarMenuReveal(
                          props.menu.source,
                          props.menu.toolbarRect,
                          target
                      ).enter
                    : null
            const transform = (
                x: number,
                y: number,
                sx: number,
                sy: number
            ) =>
                `translate(${x}px, ${y}px) scale(${sx}, ${sy})`
            const animation = root.animate(
                frames
                    ? frames.x.map((x, i) => ({
                          transform: transform(
                              x,
                              frames.y[i]!,
                              frames.scaleX[i]!,
                              frames.scaleY[i]!
                          ),
                          opacity: 1,
                      }))
                    : [
                          {
                              transform: transform(
                                  reveal.x,
                                  reveal.y,
                                  reveal.scaleX,
                                  reveal.scaleY
                              ),
                              opacity: reveal.opacity,
                          },
                          { transform: "none", opacity: 1 },
                      ],
                {
                    duration: 220,
                    easing: "cubic-bezier(.22,1,.36,1)",
                }
            )
            onCleanup(() => animation.cancel())
        }
        root.focus()
        function outside(event: PointerEvent) {
            if (
                event.target instanceof Node &&
                !root.contains(event.target)
            )
                closeContextMenu(false)
        }
        const close = () => closeContextMenu(false)
        let scrollUntil = 0
        const intent = () => {
            scrollUntil = performance.now() + 2000
        }
        const scroll = (event: Event) => {
            if (
                performance.now() < scrollUntil &&
                event.target instanceof Node &&
                !root.contains(event.target)
            )
                close()
        }
        window.addEventListener("pointerdown", outside, true)
        window.addEventListener("blur", close)
        window.addEventListener("wheel", intent, {
            capture: true,
            passive: true,
        })
        window.addEventListener("touchmove", intent, {
            capture: true,
            passive: true,
        })
        window.addEventListener("scroll", scroll, true)
        window.addEventListener("resize", refit)
        viewport?.addEventListener("resize", refit)
        viewport?.addEventListener("scroll", refit)
        onCleanup(() => {
            unregister()
            restore()
            window.removeEventListener(
                "pointerdown",
                outside,
                true
            )
            window.removeEventListener("blur", close)
            window.removeEventListener("wheel", intent, true)
            window.removeEventListener(
                "touchmove",
                intent,
                true
            )
            window.removeEventListener("scroll", scroll, true)
            window.removeEventListener("resize", refit)
            viewport?.removeEventListener("resize", refit)
            viewport?.removeEventListener("scroll", refit)
        })
    })
    let typed = "",
        typedAt = 0
    return (
        <div
            ref={root}
            role="menu"
            tabIndex={-1}
            class="glass-menu fixed z-[75] min-w-52 overflow-y-auto rounded-2xl p-1 outline-none"
            style={{
                left: `${position().left}px`,
                top: `${position().top}px`,
                "max-height": `${position().maxHeight}px`,
                "max-width": "calc(100vw - 16px)",
                "transform-origin": "center",
            }}
            onKeyDown={(event) => {
                const items = controls(),
                    index = items.indexOf(
                        document.activeElement as HTMLButtonElement
                    )
                let next: number | undefined
                if (event.key === "Escape") {
                    event.preventDefault()
                    event.stopPropagation()
                    closeContextMenu()
                    return
                }
                if (event.key === "Tab") {
                    closeContextMenu(false)
                    return
                }
                if (event.key === "ArrowDown")
                    next = (index + 1) % items.length
                if (event.key === "ArrowUp")
                    next =
                        (index - 1 + items.length) %
                        items.length
                if (event.key === "Home") next = 0
                if (event.key === "End")
                    next = items.length - 1
                if (
                    event.key.length === 1 &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    event.key !== " "
                ) {
                    typed =
                        performance.now() - typedAt > 700
                            ? event.key
                            : typed + event.key
                    typedAt = performance.now()
                    next = items.findIndex((item) =>
                        item.textContent
                            ?.trim()
                            .toLocaleLowerCase()
                            .startsWith(
                                typed.toLocaleLowerCase()
                            )
                    )
                }
                if (next !== undefined) {
                    event.preventDefault()
                    items[next]?.focus()
                }
            }}
        >
            <For each={props.menu.items}>
                {(item) =>
                    item === "divider" ? (
                        <hr class="my-1 h-px bg-separator" />
                    ) : "heading" in item ? (
                        <div class="px-3 py-2 text-caption text-label-secondary">
                            {item.heading}
                        </div>
                    ) : (
                        // biome-ignore lint/a11y/useAriaPropsSupportedByRole: the dynamic menuitemcheckbox role supports aria-checked.
                        <button
                            type="button"
                            role={
                                item.checked === undefined
                                    ? "menuitem"
                                    : "menuitemcheckbox"
                            }
                            aria-checked={item.checked}
                            disabled={item.disabled}
                            tabIndex={-1}
                            class={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 text-start text-subheadline hover:bg-fill focus:bg-fill focus:outline-none disabled:opacity-40",
                                props.menu.touch
                                    ? "min-h-12"
                                    : "min-h-10",
                                item.destructive
                                    ? "text-danger"
                                    : "text-label"
                            )}
                            onPointerMove={(event) => {
                                if (!item.disabled)
                                    event.currentTarget.focus()
                            }}
                            onClick={() => {
                                closeContextMenu()
                                item.onSelect()
                            }}
                        >
                            {item.icon}
                            <span class="grow">
                                {item.label}
                            </span>
                            <Show when={item.checked}>
                                <span aria-hidden="true">
                                    ✓
                                </span>
                            </Show>
                        </button>
                    )
                }
            </For>
        </div>
    )
}
export * from "./context-menu-store"
export * from "./use-context-menu"
