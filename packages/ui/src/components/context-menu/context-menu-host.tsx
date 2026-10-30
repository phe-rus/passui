import {
    AnimatePresence,
    motion,
    useIsPresent,
    useReducedMotion,
} from "motion/react"
import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react"
import { FLOATING_LAYER } from "../../hooks/use-dismiss"
import { CheckIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { registerFloatingLayer } from "../../lib/floating-layers"
import { screenEdges } from "../../lib/screen-edges"
import { spring } from "../../motion/transitions"
import { concealMenuSource } from "./conceal-menu-source"
import { menuPosition } from "./menu-position"
import { menuSurfaceReveal } from "./menu-reveal"
import {
    closeContextMenu,
    getContextMenu,
    type OpenMenu,
    subscribeContextMenu,
} from "./context-menu-store"

/** Renders the open context menu. Mount once, near the app root. */
export function ContextMenuHost() {
    const menu = useSyncExternalStore(
        subscribeContextMenu,
        getContextMenu,
        () => null
    )
    return (
        <AnimatePresence>
            {menu && <Menu key={menu.id} menu={menu} />}
        </AnimatePresence>
    )
}

function Menu({ menu }: { menu: OpenMenu }) {
    const present = useIsPresent()
    const reducedMotion = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const content = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({
        left: menu.x,
        top: menu.y,
        originX: 0,
        originY: 0,
        maxHeight: undefined as number | undefined,
        width: 0,
        height: 0,
        ready: false,
    })
    const [focused, setFocused] = useState(-1)

    useLayoutEffect(() => {
        if (
            (!menu.source && !menu.toolbar) ||
            !position.ready ||
            !(menu.anchor instanceof HTMLElement)
        )
            return
        const anchor = menu.toolbar ?? menu.anchor
        const surface = ref.current
        const restore = concealMenuSource(
            anchor,
            Boolean(menu.toolbar)
        )
        return () => {
            const restored = restore()
            if (
                restored &&
                menu.toolbar &&
                menu.restoreFocus &&
                menu.anchor instanceof HTMLElement &&
                (document.activeElement === document.body ||
                    surface?.contains(document.activeElement))
            )
                menu.anchor.focus({ preventScroll: true })
        }
    }, [menu, position.ready])

    useLayoutEffect(() => {
        const surface = ref.current
        if (!surface || !present || !position.ready) return
        const unregister = menu.anchor
            ? registerFloatingLayer(surface, menu.anchor)
            : undefined
        surface.focus()
        return unregister
    }, [menu.anchor, present, position.ready])

    // Keep the whole menu on screen, opening up or left when near an edge. The
    // layout size, not the on-screen one: the menu is still mid-scale here.
    useLayoutEffect(() => {
        if (!ref.current || !present) return
        const viewport = window.visualViewport
        let frame = 0
        const refit = () => {
            const element = ref.current
            if (!element) return
            const edges = screenEdges()
            const left = viewport?.offsetLeft ?? 0
            const top = viewport?.offsetTop ?? 0
            setPosition({
                ...menuPosition(
                    menu,
                    {
                        width: element.offsetWidth,
                        height: Math.max(
                            element.offsetHeight,
                            (content.current?.scrollHeight ??
                                0) + 12
                        ),
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
                ),
                ready: true,
            })
        }
        const schedule = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(refit)
        }
        refit()
        viewport?.addEventListener("resize", schedule)
        viewport?.addEventListener("scroll", schedule)
        window.addEventListener("resize", schedule)
        return () => {
            cancelAnimationFrame(frame)
            viewport?.removeEventListener("resize", schedule)
            viewport?.removeEventListener("scroll", schedule)
            window.removeEventListener("resize", schedule)
        }
    }, [menu, present])

    useEffect(() => {
        if (!present) return
        const onPointer = (event: PointerEvent) => {
            if (!ref.current?.contains(event.target as Node))
                closeContextMenu(false)
        }
        const close = () => closeContextMenu(false)
        let scrollIntentUntil = 0
        const markScroll = () => {
            scrollIntentUntil = performance.now() + 2000
        }
        const onScrollKey = (event: KeyboardEvent) => {
            if (
                !ref.current?.contains(
                    event.target as Node
                ) &&
                [
                    "PageDown",
                    "PageUp",
                    "Home",
                    "End",
                    " ",
                ].includes(event.key)
            )
                markScroll()
        }
        const onScroll = (event: Event) => {
            if (
                performance.now() < scrollIntentUntil &&
                !ref.current?.contains(event.target as Node)
            )
                close()
        }
        // Opened by a long-press: ignore the finger lifting off.
        const timer = setTimeout(() => {
            window.addEventListener(
                "pointerdown",
                onPointer,
                true
            )
        }, 0)
        window.addEventListener("blur", close)
        window.addEventListener("wheel", markScroll, {
            capture: true,
            passive: true,
        })
        window.addEventListener("touchmove", markScroll, {
            capture: true,
            passive: true,
        })
        window.addEventListener("keydown", onScrollKey, true)
        window.addEventListener("scroll", onScroll, true)
        return () => {
            clearTimeout(timer)
            window.removeEventListener(
                "pointerdown",
                onPointer,
                true
            )
            window.removeEventListener("blur", close)
            window.removeEventListener(
                "wheel",
                markScroll,
                true
            )
            window.removeEventListener(
                "touchmove",
                markScroll,
                true
            )
            window.removeEventListener(
                "keydown",
                onScrollKey,
                true
            )
            window.removeEventListener(
                "scroll",
                onScroll,
                true
            )
        }
    }, [present])

    const source = menuSurfaceReveal(
        position.ready
            ? (menu.toolbarRect ?? menu.source)
            : undefined,
        position
    )
    let actionIndex = -1
    return (
        <motion.div
            key={position.ready ? "surface" : "measure"}
            ref={ref}
            role="menu"
            tabIndex={-1}
            onKeyDown={(event) => {
                if (!present) return
                if (event.key === "Escape") {
                    event.preventDefault()
                    event.stopPropagation()
                    closeContextMenu()
                    return
                }
                if (event.key === "Tab") {
                    closeContextMenu()
                    return
                }
                const keys = [
                    "ArrowDown",
                    "ArrowUp",
                    "Home",
                    "End",
                ]
                if (!keys.includes(event.key)) return
                event.preventDefault()
                const controls = Array.from(
                    ref.current?.querySelectorAll<HTMLButtonElement>(
                        "[role=menuitem]:not(:disabled)"
                    ) ?? []
                )
                if (!controls.length) return
                const current = controls.indexOf(
                    document.activeElement as HTMLButtonElement
                )
                const next =
                    event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? controls.length - 1
                          : event.key === "ArrowDown"
                            ? (current + 1) % controls.length
                            : current < 0
                              ? controls.length - 1
                              : (current -
                                    1 +
                                    controls.length) %
                                controls.length
                controls[next]?.focus()
            }}
            {...{ [FLOATING_LAYER]: "" }}
            className={cn(
                "fixed z-75 isolate flex min-w-50 max-w-[min(280px,calc(100vw-24px))] flex-col rounded-3xl p-1.5",
                menu.touch && "min-w-60",
                !present && "pointer-events-none"
            )}
            style={{
                left: position.left,
                top: position.top,
                maxHeight: position.maxHeight,
                minWidth: menu.toolbarRect
                    ? Math.min(
                          Math.max(
                              200,
                              menu.toolbarRect.width
                          ),
                          window.innerWidth - 24
                      )
                    : undefined,
                visibility: position.ready
                    ? undefined
                    : "hidden",
            }}
            onContextMenu={(event) => event.preventDefault()}
        >
            <motion.div
                aria-hidden="true"
                className="glass-menu pointer-events-none absolute top-0 left-0 -z-10 rounded-3xl"
                style={{ width: "100%", height: "100%" }}
                initial={
                    reducedMotion || !position.ready
                        ? false
                        : source
                }
                animate={
                    position.ready
                        ? {
                              x: 0,
                              y: 0,
                              width: position.width,
                              height: position.height,
                              opacity: 1,
                              borderRadius:
                                  "var(--radius-3xl)",
                          }
                        : undefined
                }
                exit={reducedMotion ? { opacity: 0 } : source}
                transition={
                    reducedMotion
                        ? { duration: 0 }
                        : spring.smooth
                }
            />
            <motion.div
                ref={content}
                className="flex flex-col overflow-y-auto overscroll-contain"
                style={{
                    maxHeight: position.maxHeight
                        ? Math.max(0, position.maxHeight - 12)
                        : undefined,
                }}
                initial={
                    reducedMotion
                        ? false
                        : {
                              opacity: 0,
                              y:
                                  menu.source &&
                                  menu.source.top >
                                      position.top
                                      ? 4
                                      : -4,
                          }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: reducedMotion ? 0 : 0.06,
                    },
                }}
                transition={{
                    duration: reducedMotion ? 0 : 0.16,
                    delay:
                        reducedMotion || !menu.source
                            ? 0
                            : 0.06,
                }}
            >
                {menu.items.map((item, index) => {
                    if (item === "divider") {
                        return (
                            <div
                                key={`divider-${index}`}
                                className="mx-2 my-1 h-px bg-separator/80"
                            />
                        )
                    }
                    if ("heading" in item) {
                        return (
                            <span
                                key={`heading-${item.heading}`}
                                className="px-2.5 pt-1.5 pb-0.5 text-caption2 font-semibold text-label-tertiary"
                            >
                                {item.heading}
                            </span>
                        )
                    }
                    if (!item.disabled) actionIndex += 1
                    const current = actionIndex
                    return (
                        <button
                            key={item.label}
                            type="button"
                            role="menuitem"
                            tabIndex={-1}
                            disabled={item.disabled}
                            onFocus={() =>
                                setFocused(current)
                            }
                            onPointerEnter={() =>
                                !item.disabled &&
                                setFocused(current)
                            }
                            onClick={() => {
                                closeContextMenu()
                                item.onSelect()
                            }}
                            className={cn(
                                "flex items-center gap-2.5 rounded-lg px-2.5 text-start text-subheadline transition-colors disabled:opacity-40",
                                menu.touch
                                    ? "py-2.5"
                                    : "py-1.5",
                                item.destructive
                                    ? "text-danger"
                                    : "text-label",
                                focused === current &&
                                    !item.disabled &&
                                    (item.destructive
                                        ? "bg-danger/10"
                                        : "bg-fill")
                            )}
                        >
                            <span className="flex w-4 shrink-0 justify-center text-label-secondary">
                                {item.checked ? (
                                    <CheckIcon
                                        size={15}
                                        strokeWidth={2.4}
                                        className="text-accent-text"
                                    />
                                ) : (
                                    item.icon
                                )}
                            </span>
                            <span className="grow truncate">
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}
