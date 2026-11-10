import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { spring } from "../../motion/transitions"
import { useEffect, useId, useState } from "react"
import { cn } from "../../lib/class-names"

export type TooltipSize = "sm" | "md" | "lg"

const tooltipClasses: Record<TooltipSize, string> = {
    sm: "pointer-events-none fixed z-[80] max-w-[200px] rounded-md bg-inverse px-2 py-1 text-center text-caption2 leading-tight font-medium text-on-inverse shadow-lg",
    md: "pointer-events-none fixed z-[80] max-w-[240px] rounded-md bg-inverse px-2.5 py-1.5 text-center text-caption leading-tight font-medium text-on-inverse shadow-lg",
    lg: "pointer-events-none fixed z-[80] max-w-[280px] rounded-md bg-inverse px-3 py-2 text-center text-footnote leading-tight font-medium text-on-inverse shadow-lg",
}

interface Tip {
    text: string
    x: number
    y: number
    /** Shown above the element when there's no room below. */
    above: boolean
    size: TooltipSize
}

const DELAY = 450
/** Moving from one control to the next within this window shows at once. */
const WARM_WINDOW = 600
const MARGIN = 8

/**
 * Tooltips for any element with `data-tooltip`, on devices that can hover.
 * One listener for the whole app: a short delay before the first, then
 * instant while moving between controls, as on macOS.
 */
export function TooltipHost() {
    const [tip, setTip] = useState<Tip | null>(null)
    const tooltipId = useId()
    const reducedMotion = useReducedMotion()

    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
        let timer: ReturnType<typeof setTimeout> | undefined
        let current: Element | null = null
        let lastShown = 0
        let described: Element | null = null
        let previousDescription: string | null = null

        const restoreDescription = () => {
            if (!described) return
            if (previousDescription === null) described.removeAttribute("aria-describedby")
            else described.setAttribute("aria-describedby", previousDescription)
            described = null
        }

        const show = (element: Element) => {
            const text = element.getAttribute("data-tooltip")
            if (!text) return
            const rect = element.getBoundingClientRect()
            const above = rect.bottom + 40 > window.innerHeight
            const sizeAttr = element.getAttribute("data-tooltip-size")
            const size: TooltipSize = sizeAttr === "sm" || sizeAttr === "lg" ? sizeAttr : "md"
            setTip({
                text,
                x: rect.left + rect.width / 2,
                y: above ? rect.top - MARGIN : rect.bottom + MARGIN,
                above,
                size,
            })
            lastShown = Date.now()
        }
        const hide = () => {
            clearTimeout(timer)
            if (current) lastShown = Date.now()
            current = null
            restoreDescription()
            setTip(null)
        }
        const onOver = (event: PointerEvent) => {
            if (!canHover) return
            const element = (event.target as Element | null)?.closest?.("[data-tooltip]") ?? null
            if (element === current) return
            clearTimeout(timer)
            current = element
            if (!element) {
                setTip(null)
                return
            }
            const warm = Date.now() - lastShown < WARM_WINDOW
            if (warm) show(element)
            else {
                setTip(null)
                timer = setTimeout(() => current === element && show(element), DELAY)
            }
        }
        const onFocus = (event: FocusEvent) => {
            const element = (event.target as Element | null)?.closest?.("[data-tooltip]") ?? null
            if (!element) return
            hide()
            current = element
            described = element
            previousDescription = element.getAttribute("aria-describedby")
            element.setAttribute(
                "aria-describedby",
                [previousDescription, tooltipId].filter(Boolean).join(" ")
            )
            show(element)
        }
        const onBlur = (event: FocusEvent) => {
            if (described && !described.contains(event.relatedTarget as Node | null)) hide()
        }

        window.document.addEventListener("pointerover", onOver)
        window.document.addEventListener("focusin", onFocus)
        window.document.addEventListener("focusout", onBlur)
        window.document.addEventListener("pointerdown", hide, true)
        window.document.addEventListener("keydown", hide, true)
        window.addEventListener("scroll", hide, true)
        window.addEventListener("blur", hide)
        return () => {
            clearTimeout(timer)
            restoreDescription()
            window.document.removeEventListener("pointerover", onOver)
            window.document.removeEventListener("focusin", onFocus)
            window.document.removeEventListener("focusout", onBlur)
            window.document.removeEventListener("pointerdown", hide, true)
            window.document.removeEventListener("keydown", hide, true)
            window.removeEventListener("scroll", hide, true)
            window.removeEventListener("blur", hide)
        }
    }, [tooltipId])

    return (
        <AnimatePresence>
            {tip && (
                <motion.div
                    id={tooltipId}
                    key={tip.text + tip.x}
                    role="tooltip"
                    className={cn(tooltipClasses[tip.size])}
                    style={{
                        left: Math.min(Math.max(tip.x, 128), window.innerWidth - 128),
                        top: tip.y,
                        translateX: "-50%",
                        translateY: tip.above ? "-100%" : 0,
                    }}
                    initial={
                        reducedMotion
                            ? false
                            : {
                                  opacity: 0,
                                  scale: 0.92,
                                  y: tip.above ? 4 : -4,
                              }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={
                        reducedMotion
                            ? { opacity: 0 }
                            : {
                                  opacity: 0,
                                  scale: 0.96,
                                  y: tip.above ? 2 : -2,
                                  transition: spring.snappy,
                              }
                    }
                    transition={reducedMotion ? { duration: 0 } : spring.snappy}
                >
                    {tip.text}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
