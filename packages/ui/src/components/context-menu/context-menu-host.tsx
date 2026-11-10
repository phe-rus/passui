import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react"
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react"
import { FLOATING_LAYER } from "../../hooks/use-dismiss"
import { CheckIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { belongsToFloatingSurface, registerFloatingLayer } from "../../lib/floating-layers"
import { screenEdges } from "../../lib/screen-edges"
import { spring, fluidCollapse, fluidOvershoot } from "../../motion/transitions"
import { concealMenuSource } from "./conceal-menu-source"
import { findMenuTypeaheadIndex, isMenuNavigationKey, nextMenuIndex } from "./menu-navigation"
import { menuPosition } from "./menu-position"
import { menuSurfaceExit, menuSurfaceReveal } from "./menu-reveal"
import {
    closeContextMenu,
    getContextMenu,
    type ContextMenuItem,
    type ContextMenuSize,
    openContextMenu,
    openFollowUpMenu,
    openMenu,
    subscribeContextMenu,
} from "./context-menu-store"
import type { OpenMenu } from "./context-menu-store"

const surfaceSizes: Record<ContextMenuSize, string> = {
    sm: "min-w-44 max-w-[min(240px,calc(100vw-24px))] rounded-2xl p-1",
    md: "min-w-50 max-w-[min(280px,calc(100vw-24px))] rounded-3xl p-1.5",
    lg: "min-w-56 max-w-[min(320px,calc(100vw-24px))] rounded-3xl p-2",
}
const itemSizes: Record<ContextMenuSize, string> = {
    sm: "flex items-center gap-2 rounded-md px-2 py-1 text-start text-caption transition-colors disabled:opacity-40",
    md: "flex items-center gap-2.5 rounded-lg px-2.5 text-start text-subheadline transition-colors disabled:opacity-40",
    lg: "flex items-center gap-3 rounded-lg px-3 py-2 text-start text-body transition-colors disabled:opacity-40",
}
const headingSizes: Record<ContextMenuSize, string> = {
    sm: "px-2 pt-1 pb-0.5 text-caption2 font-semibold text-label-tertiary",
    md: "px-2.5 pt-1.5 pb-0.5 text-caption2 font-semibold text-label-tertiary",
    lg: "px-3 pt-2 pb-1 text-caption font-semibold text-label-tertiary",
}
const dividerSizes: Record<ContextMenuSize, string> = {
    sm: "mx-1.5 my-0.5 h-px bg-separator/80",
    md: "mx-2 my-1 h-px bg-separator/80",
    lg: "mx-2.5 my-1.5 h-px bg-separator/80",
}
const iconSlotSizes: Record<ContextMenuSize, string> = {
    sm: "flex w-3.5 shrink-0 justify-center text-label-secondary",
    md: "flex w-4 shrink-0 justify-center text-label-secondary",
    lg: "flex w-5 shrink-0 justify-center text-label-secondary",
}
const checkIconSizes: Record<ContextMenuSize, number> = {
    sm: 13,
    md: 15,
    lg: 17,
}

/** Renders the open context menu. Mount once, near the app root. */
export function ContextMenuHost() {
    const menu = useSyncExternalStore(subscribeContextMenu, getContextMenu, () => null)
    return <AnimatePresence>{menu && <Menu key={menu.id} menu={menu} />}</AnimatePresence>
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
        radius: 0,
        ready: false,
    })
    const [focused, setFocused] = useState(-1)
    const typeahead = useRef({ query: "", at: 0 })

    useLayoutEffect(() => {
        if (
            !present ||
            (!menu.source && !menu.toolbar) ||
            !position.ready ||
            !(menu.anchor instanceof HTMLElement)
        )
            return
        const anchor = menu.toolbar ?? menu.anchor
        const surface = ref.current
        const restore = concealMenuSource(anchor, Boolean(menu.toolbar))
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
    }, [menu, position.ready, present])

    useLayoutEffect(() => {
        const surface = ref.current
        if (!surface || !present || !position.ready) return
        const unregister = menu.anchor ? registerFloatingLayer(surface, menu.anchor) : undefined
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
            const next = {
                ...menuPosition(
                    menu,
                    {
                        width: element.offsetWidth,
                        height: Math.max(
                            element.offsetHeight,
                            (content.current?.scrollHeight ?? 0) + 12
                        ),
                    },
                    {
                        left: left + edges.left,
                        top: top + edges.top,
                        right: left + (viewport?.width ?? window.innerWidth) - edges.right,
                        bottom: top + (viewport?.height ?? window.innerHeight) - edges.bottom,
                    }
                ),
                radius: Number.parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0,
                ready: true,
            }
            setPosition((current) =>
                current.left === next.left &&
                current.top === next.top &&
                current.originX === next.originX &&
                current.originY === next.originY &&
                current.maxHeight === next.maxHeight &&
                current.width === next.width &&
                current.height === next.height &&
                current.radius === next.radius &&
                current.ready === next.ready
                    ? current
                    : next
            )
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
            if (!ref.current || !belongsToFloatingSurface(ref.current, event.target as Element))
                closeContextMenu(false)
        }
        const close = () => closeContextMenu(false)
        let scrollIntentUntil = 0
        const markScroll = () => {
            scrollIntentUntil = performance.now() + 2000
        }
        const onScrollKey = (event: KeyboardEvent) => {
            if (
                !ref.current?.contains(event.target as Node) &&
                ["PageDown", "PageUp", "Home", "End", " "].includes(event.key)
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
            window.addEventListener("pointerdown", onPointer, true)
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
            window.removeEventListener("pointerdown", onPointer, true)
            window.removeEventListener("blur", close)
            window.removeEventListener("wheel", markScroll, true)
            window.removeEventListener("touchmove", markScroll, true)
            window.removeEventListener("keydown", onScrollKey, true)
            window.removeEventListener("scroll", onScroll, true)
        }
    }, [present])

    const source = menuSurfaceReveal(
        position.ready ? (menu.toolbarRect ?? menu.source) : undefined,
        position
    )
    let actionIndex = -1
    return (
        <div
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
                const controls = Array.from(
                    ref.current?.querySelectorAll<HTMLButtonElement>(
                        "[role=menuitem]:not(:disabled)"
                    ) ?? []
                )
                if (!isMenuNavigationKey(event.key)) {
                    if (
                        event.key.length !== 1 ||
                        !event.key.trim() ||
                        event.altKey ||
                        event.ctrlKey ||
                        event.metaKey ||
                        event.nativeEvent.isComposing
                    )
                        return
                    const now = performance.now()
                    const query =
                        (now - typeahead.current.at < 700 ? typeahead.current.query : "") +
                        event.key
                    typeahead.current = { query, at: now }
                    const labels = controls.map((control) => control.textContent ?? "")
                    const current = controls.indexOf(document.activeElement as HTMLButtonElement)
                    let next = findMenuTypeaheadIndex(labels, query, current)
                    if (next < 0) {
                        typeahead.current.query = event.key
                        next = findMenuTypeaheadIndex(labels, event.key, current)
                    }
                    if (next >= 0) {
                        event.preventDefault()
                        controls[next]?.focus()
                    }
                    return
                }
                event.preventDefault()
                if (!controls.length) return
                const current = controls.indexOf(document.activeElement as HTMLButtonElement)
                const next = nextMenuIndex(event.key, current, controls.length)
                controls[next]?.focus()
            }}
            {...{ [FLOATING_LAYER]: "" }}
            className={cn(
                "fixed z-75 isolate flex flex-col outline-none",
                surfaceSizes[menu.size],
                menu.touch && "min-w-60",
                !present && "pointer-events-none"
            )}
            style={{
                left: position.left,
                top: position.top,
                maxHeight: position.maxHeight,
                minWidth: menu.toolbarRect
                    ? Math.min(Math.max(200, menu.toolbarRect.width), window.innerWidth - 24)
                    : undefined,
                visibility: position.ready ? undefined : "hidden",
            }}
            onContextMenu={(event) => event.preventDefault()}
        >
            {position.ready && (
                <motion.div
                    aria-hidden="true"
                    className="glass-menu pointer-events-none absolute top-0 left-0 -z-10 rounded-3xl"
                    style={{ width: "100%", height: "100%" }}
                    initial={reducedMotion || !position.ready ? false : source}
                    animate={
                        position.ready
                            ? {
                                  x: 0,
                                  y: 0,
                                  width: position.width,
                                  height: position.height,
                                  opacity: 1,
                                  borderRadius: position.radius,
                              }
                            : undefined
                    }
                    exit={
                        reducedMotion
                            ? { opacity: 0 }
                            : { ...menuSurfaceExit(source), transition: fluidCollapse }
                    }
                    transition={
                        reducedMotion
                            ? { duration: 0 }
                            : { ...fluidOvershoot, opacity: { duration: 0.16 } }
                    }
                />
            )}
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
                              scale: 0.96,
                              y: menu.source && menu.source.top > position.top ? 4 : -4,
                          }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                    opacity: 0,
                    scale: 0.98,
                    transition: {
                        duration: reducedMotion ? 0 : 0.06,
                    },
                }}
                transition={{
                    duration: reducedMotion ? 0 : 0.2,
                    ease: reducedMotion
                        ? undefined
                        : ([0.4, 0, 0.2, 1] as [number, number, number, number]),
                    delay: reducedMotion || !menu.source ? 0 : 0.06,
                }}
            >
                {menu.items.map((item, index) => {
                    if (item === "divider") {
                        return <div key={`divider-${index}`} className={dividerSizes[menu.size]} />
                    }
                    if ("heading" in item) {
                        return (
                            <span key={`heading-${index}`} className={headingSizes[menu.size]}>
                                {item.heading}
                            </span>
                        )
                    }
                    if (!item.disabled) actionIndex += 1
                    const current = actionIndex
                    return (
                        <button
                            key={`item-${index}`}
                            type="button"
                            role="menuitem"
                            tabIndex={-1}
                            disabled={item.disabled}
                            onFocus={() => setFocused(current)}
                            onPointerEnter={() => !item.disabled && setFocused(current)}
                            onClick={() => {
                                closeContextMenu()
                                item.onSelect()
                            }}
                            className={cn(
                                itemSizes[menu.size],
                                menu.touch ? "py-2.5" : "py-1.5",
                                item.destructive ? "text-danger" : "text-label",
                                focused === current &&
                                    !item.disabled &&
                                    (item.destructive ? "bg-danger/10" : "bg-fill")
                            )}
                        >
                            <span className={iconSlotSizes[menu.size]}>
                                {item.checked ? (
                                    <CheckIcon
                                        size={checkIconSizes[menu.size]}
                                        strokeWidth={2.4}
                                        className="text-accent-text"
                                    />
                                ) : (
                                    item.icon
                                )}
                            </span>
                            <span className="grow truncate">{item.label}</span>
                        </button>
                    )
                })}
            </motion.div>
        </div>
    )
}
