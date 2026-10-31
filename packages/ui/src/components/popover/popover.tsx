import {
    AnimatePresence,
    type HTMLMotionProps,
    motion,
    useReducedMotion,
} from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"
import { cn } from "../../lib/class-names"
import { screenEdges } from "../../lib/screen-edges"
import { floatingPanelMotion } from "../../motion/transitions"
import { fitPopover, type PopoverFit } from "./popover-fit"

export type PopoverOrigin = "top-left" | "top-right"

export interface PopoverProps extends HTMLMotionProps<"div"> {
    open: boolean
    /** Which corner the popover grows from. */
    origin?: PopoverOrigin
}

/**
 * A glass surface that springs open from its anchor. Position it with
 * `className` (it is absolutely positioned within a relative parent); it
 * flips above its relative parent when the bottom edge is short, and
 * stays inside the visible viewport as it resizes or scrolls.
 */
export function Popover({ open, ...props }: PopoverProps) {
    return (
        <AnimatePresence>
            {open && <OpenPopover {...props} />}
        </AnimatePresence>
    )
}

function OpenPopover({
    origin = "top-left",
    className,
    style,
    children,
    ...props
}: Omit<PopoverProps, "open">) {
    const ref = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const [fit, setFit] = useState<PopoverFit>({
        shiftX: 0,
        shiftY: 0,
        maxWidth: 0,
        above: false,
    })
    const popoverMotion = floatingPanelMotion(
        fit.above ? "above" : "below"
    )

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
            const neededHeight = Math.max(
                rect.height,
                element.scrollHeight
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
                offsetParent instanceof HTMLElement &&
                offsetParent !== document.body
                    ? offsetParent.getBoundingClientRect()
                    : undefined
            const next = fitPopover(
                {
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: neededHeight,
                },
                anchor,
                {
                    viewport: {
                        width:
                            offsetLeft +
                            (visualViewport?.width ??
                                window.innerWidth),
                        height:
                            offsetTop +
                            (visualViewport?.height ??
                                window.innerHeight),
                    },
                    edges: {
                        ...edges,
                        left: offsetLeft + edges.left,
                        top: offsetTop + edges.top,
                    },
                },
                6,
                origin
            )
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
        const viewport = window.visualViewport
        viewport?.addEventListener("resize", scheduleRefit)
        viewport?.addEventListener("scroll", scheduleRefit)
        window.addEventListener("resize", scheduleRefit)
        window.addEventListener("scroll", scheduleRefit, true)
        return () => {
            cancelAnimationFrame(frame)
            viewport?.removeEventListener(
                "resize",
                scheduleRefit
            )
            viewport?.removeEventListener(
                "scroll",
                scheduleRefit
            )
            window.removeEventListener(
                "resize",
                scheduleRefit
            )
            window.removeEventListener(
                "scroll",
                scheduleRefit,
                true
            )
        }
    }, [origin])

    return (
        <motion.div
            ref={ref}
            {...popoverMotion}
            initial={
                reducedMotion
                    ? { opacity: 0 }
                    : popoverMotion.initial
            }
            animate={
                reducedMotion
                    ? { opacity: 1 }
                    : popoverMotion.animate
            }
            exit={
                reducedMotion
                    ? { opacity: 0 }
                    : popoverMotion.exit
            }
            transition={
                reducedMotion
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
                    fit.maxHeight !== undefined
                        ? "auto"
                        : undefined,
                ...style,
            }}
            className={cn(
                "glass-menu absolute z-40 rounded-5xl",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}
