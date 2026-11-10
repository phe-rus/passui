import {
    AnimatePresence,
    type HTMLMotionProps,
    motion,
    useIsPresent,
    useReducedMotion,
} from "motion/react"
import { type ReactNode, type RefObject, useLayoutEffect, useRef, useState } from "react"
import { concealMenuSource } from "../context-menu/conceal-menu-source"
import { menuSurfaceExit, menuSurfaceReveal } from "../context-menu/menu-reveal"
import { cn } from "../../lib/class-names"
import { screenEdges } from "../../lib/screen-edges"
import {
    contentCrossfade,
    floatingPanelMotion,
    fluidCollapse,
    fluidOvershoot,
    spring,
} from "../../motion/transitions"
import { fitPopover, type PopoverFit } from "./popover-fit"

export type PopoverOrigin = "top-left" | "top-right"
export type PopoverSize = "sm" | "md"

const surfaceRadius: Record<PopoverSize, string> = {
    sm: "rounded-3xl",
    md: "rounded-5xl",
}

export interface PopoverProps extends Omit<HTMLMotionProps<"div">, "children"> {
    open: boolean
    children?: ReactNode
    /** Which corner the popover grows from. */
    origin?: PopoverOrigin
    /** Trigger whose shape the popover uses during its opening and closing motion. */
    anchorRef?: RefObject<HTMLElement | null>
    /** Surface corner radius. @default "md" */
    size?: PopoverSize
}

/**
 * A glass surface that springs open from its anchor. Position it with
 * `className` (it is absolutely positioned within a relative parent); it
 * flips above its relative parent when the bottom edge is short, and
 * stays inside the visible viewport as it resizes or scrolls.
 */
export function Popover({ open, ...props }: PopoverProps) {
    return <AnimatePresence>{open && <OpenPopover {...props} />}</AnimatePresence>
}

function OpenPopover({
    origin = "top-left",
    anchorRef,
    size = "md",
    className,
    style,
    children,
    ...props
}: Omit<PopoverProps, "open">) {
    const ref = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const present = useIsPresent()
    const [settled, setSettled] = useState(false)
    const [material, setMaterial] = useState({ width: 0, height: 0, radius: 0 })
    const [fit, setFit] = useState<PopoverFit>({
        shiftX: 0,
        shiftY: 0,
        maxWidth: 0,
        above: false,
    })
    const [reveal, setReveal] = useState<ReturnType<typeof menuSurfaceReveal> | null>(null)
    const popoverMotion = floatingPanelMotion(fit.above ? "above" : "below")

    // For anchored popovers, the surface morphs from the trigger via
    // menuSurfaceReveal. For non-anchored popovers, we use scale + the
    // fluid overshoot spring so the panel grows from the origin corner
    // with a physical bounce — Apple's matched-geometry feel.

    useLayoutEffect(() => {
        const refit = () => {
            const element = ref.current
            if (!element) return
            // Measure the authored position without the opening animation or
            // our viewport correction. This prevents cumulative drift.
            const transform = element.style.transform
            const translate = element.style.translate
            const maxHeight = element.style.maxHeight
            const maxWidth = element.style.maxWidth
            element.style.transform = "none"
            element.style.translate = "none"
            element.style.maxHeight = "none"
            element.style.maxWidth = "none"
            const rect = element.getBoundingClientRect()
            const neededHeight = Math.max(rect.height, element.scrollHeight)
            const radius = Number.parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0
            setMaterial((current) =>
                current.width === rect.width &&
                current.height === neededHeight &&
                current.radius === radius
                    ? current
                    : { width: rect.width, height: neededHeight, radius }
            )
            element.style.transform = transform
            element.style.translate = translate
            element.style.maxHeight = maxHeight
            element.style.maxWidth = maxWidth

            const visualViewport = window.visualViewport
            const offsetLeft = visualViewport?.offsetLeft ?? 0
            const offsetTop = visualViewport?.offsetTop ?? 0
            const edges = screenEdges()
            const offsetParent = element.offsetParent
            const anchor =
                offsetParent instanceof HTMLElement && offsetParent !== document.body
                    ? offsetParent.getBoundingClientRect()
                    : undefined
            const trigger = anchorRef?.current?.getBoundingClientRect()
            const target = {
                left: trigger
                    ? origin === "top-right"
                        ? trigger.right - rect.width
                        : trigger.left
                    : rect.left,
                top: trigger?.top ?? rect.top,
                width: rect.width,
                height: neededHeight,
            }
            const next = fitPopover(
                target,
                trigger ?? anchor,
                {
                    viewport: {
                        width: offsetLeft + (visualViewport?.width ?? window.innerWidth),
                        height: offsetTop + (visualViewport?.height ?? window.innerHeight),
                    },
                    edges: {
                        ...edges,
                        left: offsetLeft + edges.left,
                        top: offsetTop + edges.top,
                    },
                },
                trigger ? -trigger.height : 6,
                origin
            )
            next.shiftX += target.left - rect.left
            next.shiftY += target.top - rect.top
            setFit((current) => {
                if (
                    current.shiftX === next.shiftX &&
                    current.shiftY === next.shiftY &&
                    current.maxWidth === next.maxWidth &&
                    current.maxHeight === next.maxHeight &&
                    current.above === next.above
                )
                    return current
                return next
            })
        }
        refit()
        let frame = 0
        const scheduleRefit = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(refit)
        }
        const observer = new ResizeObserver(scheduleRefit)
        if (ref.current) observer.observe(ref.current)
        const viewport = window.visualViewport
        viewport?.addEventListener("resize", scheduleRefit)
        viewport?.addEventListener("scroll", scheduleRefit)
        window.addEventListener("resize", scheduleRefit)
        window.addEventListener("scroll", scheduleRefit, true)
        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
            viewport?.removeEventListener("resize", scheduleRefit)
            viewport?.removeEventListener("scroll", scheduleRefit)
            window.removeEventListener("resize", scheduleRefit)
            window.removeEventListener("scroll", scheduleRefit, true)
        }
    }, [origin, anchorRef])

    useLayoutEffect(() => {
        const source = anchorRef?.current
        const panel = ref.current
        if (!source || !panel) return
        const sourceRect = source.getBoundingClientRect()
        const panelRect = panel.getBoundingClientRect()
        setReveal(
            menuSurfaceReveal(
                {
                    left: sourceRect.left,
                    top: sourceRect.top,
                    width: sourceRect.width,
                    height: sourceRect.height,
                },
                {
                    left: panelRect.left,
                    top: panelRect.top,
                    width: fit.maxWidth || panelRect.width,
                    height: fit.maxHeight
                        ? Math.min(fit.maxHeight, panelRect.height)
                        : panelRect.height,
                }
            )
        )
    }, [anchorRef, fit])

    useLayoutEffect(() => {
        const source = anchorRef?.current
        if (!source || !present) return
        const restoreSource = concealMenuSource(source, false)
        return () => {
            restoreSource()
        }
    }, [anchorRef, present])

    return (
        <motion.div
            ref={ref}
            {...(!anchorRef && popoverMotion)}
            initial={
                anchorRef
                    ? { "--popover-content-opacity": reducedMotion ? 1 : 0 }
                    : reducedMotion
                      ? { opacity: 0 }
                      : popoverMotion.initial
            }
            animate={
                anchorRef
                    ? { "--popover-content-opacity": 1 }
                    : reducedMotion
                      ? { opacity: 1 }
                      : popoverMotion.animate
            }
            exit={
                anchorRef
                    ? {
                          "--popover-content-opacity": 0,
                          transition: { duration: reducedMotion ? 0 : 0.06 },
                      }
                    : reducedMotion
                      ? { opacity: 0 }
                      : popoverMotion.exit
            }
            transition={
                anchorRef
                    ? reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.16, delay: 0.06 }
                    : reducedMotion
                      ? { duration: 0 }
                      : popoverMotion.transition
            }
            style={{
                transformOrigin:
                    origin === "top-left"
                        ? `0% ${fit.above ? "100%" : "0%"}`
                        : `100% ${fit.above ? "100%" : "0%"}`,
                translate: `${fit.shiftX}px ${fit.shiftY}px`,
                maxWidth: fit.maxWidth || undefined,
                maxHeight: fit.maxHeight,
                overflowY:
                    fit.maxHeight !== undefined && (!anchorRef || (present && settled))
                        ? "auto"
                        : undefined,
                ...style,
            }}
            className={cn(
                anchorRef
                    ? "isolate [&>:not([data-popover-surface])]:opacity-[var(--popover-content-opacity)]"
                    : "glass-menu",
                "absolute z-40 outline-none",
                surfaceRadius[size],
                className
            )}
            {...props}
        >
            {anchorRef && (
                <motion.div
                    key={reveal ? "surface" : "measure"}
                    aria-hidden="true"
                    data-popover-surface=""
                    onAnimationComplete={() => {
                        if (reveal) setSettled(true)
                    }}
                    className={cn(
                        "glass-menu pointer-events-none absolute top-0 left-0 -z-10",
                        surfaceRadius[size]
                    )}
                    style={{ width: "100%", height: "100%" }}
                    initial={reducedMotion || !reveal ? { opacity: 0 } : reveal}
                    animate={
                        reveal
                            ? {
                                  x: 0,
                                  y: 0,
                                  width: material.width,
                                  height: fit.maxHeight
                                      ? Math.min(material.height, fit.maxHeight)
                                      : material.height,
                                  opacity: 1,
                                  borderRadius: material.radius,
                              }
                            : undefined
                    }
                    exit={
                        reducedMotion || !reveal
                            ? { opacity: 0 }
                            : { ...menuSurfaceExit(reveal), transition: fluidCollapse }
                    }
                    transition={
                        reducedMotion
                            ? { duration: 0 }
                            : { ...fluidOvershoot, opacity: { duration: 0.16 } }
                    }
                />
            )}
            <motion.div
                initial={reducedMotion ? false : anchorRef ? { opacity: 0 } : undefined}
                animate={reducedMotion ? undefined : anchorRef ? { opacity: 1 } : undefined}
                exit={
                    reducedMotion
                        ? undefined
                        : anchorRef
                          ? { opacity: 0, transition: { duration: 0.12 } }
                          : undefined
                }
                transition={reducedMotion ? { duration: 0 } : { duration: 0.16, delay: 0.06 }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
