import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { type ReactNode, useRef } from "react"
import { useVisualViewport } from "../../hooks/use-visual-viewport"
import { cn } from "../../lib/class-names"
import { contentCrossfade, spring, zoomReveal } from "../../motion/transitions"
import { SheetPortal } from "./sheet-portal"
import { useSheetFocus } from "./use-sheet-focus"

export type SheetPlacement = "adaptive" | "center"
export type SheetSize = "sm" | "md" | "lg"

const outerPaddings: Record<SheetSize, string> = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
}
const panelMaxWidths: Record<SheetSize, string> = {
    sm: "max-w-sm",
    md: "max-w-[560px]",
    lg: "max-w-2xl",
}

export interface SheetProps {
    /** Controls whether the sheet is presented. */
    open: boolean
    /** Called on Escape or an outside press. */
    onClose: () => void
    /** Allow tapping the backdrop to close. Escape still calls onClose. @default true */
    dismissOnOutsidePress?: boolean
    /** Read out by screen readers as the sheet's name. */
    label: string
    /** ID of a visible heading to use instead of label for the accessible name. */
    labelledBy?: string
    /** `adaptive` rises from the bottom on phones; `center` always floats. @default "adaptive" */
    placement?: SheetPlacement
    /** Outer padding and panel max-width. @default "md" */
    size?: SheetSize
    className?: string
    children: ReactNode
}

/**
 * A modal card: rises from the bottom edge on phones and floats in the
 * middle on larger screens. Escape or a tap outside closes it.
 */
export function Sheet({ open, ...props }: SheetProps) {
    return (
        <AnimatePresence>
            {open && (
                <SheetPortal>
                    <OpenSheet {...props} />
                </SheetPortal>
            )}
        </AnimatePresence>
    )
}

function OpenSheet({
    onClose,
    dismissOnOutsidePress = true,
    label,
    labelledBy,
    placement = "adaptive",
    size = "md",
    className,
    children,
}: Omit<SheetProps, "open">) {
    const panel = useRef<HTMLDivElement>(null)
    const reducedMotion = useReducedMotion()
    const viewport = useVisualViewport()
    useSheetFocus(panel, onClose)

    return (
        <div
            className={cn(
                "fixed inset-0 z-[65] flex justify-center",
                placement === "center"
                    ? cn("items-center", outerPaddings[size])
                    : cn("items-end sm:items-center", "sm:" + outerPaddings[size])
            )}
            style={
                viewport
                    ? {
                          top: viewport.top,
                          left: viewport.left,
                          width: viewport.width,
                          height: viewport.height,
                          bottom: "auto",
                          right: "auto",
                      }
                    : undefined
            }
        >
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-black/30 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={dismissOnOutsidePress ? onClose : undefined}
            />
            <motion.div
                ref={panel}
                role="dialog"
                aria-modal="true"
                aria-label={labelledBy ? undefined : label}
                aria-labelledby={labelledBy}
                tabIndex={-1}
                className={cn(
                    "glass-menu relative flex w-full flex-col overflow-hidden",
                    "max-h-[92%]",
                    panelMaxWidths[size],
                    placement === "center" ? "rounded-sheet" : "rounded-t-sheet sm:rounded-sheet",
                    className
                )}
                style={{
                    transformOrigin: placement === "center" ? "center center" : "bottom center",
                }}
                initial={
                    reducedMotion
                        ? { opacity: 0 }
                        : placement === "center"
                          ? zoomReveal.initial
                          : { y: 40, opacity: 0, scale: 0.96 }
                }
                animate={
                    reducedMotion
                        ? { opacity: 1 }
                        : placement === "center"
                          ? zoomReveal.animate
                          : { y: 0, opacity: 1, scale: 1 }
                }
                exit={
                    reducedMotion
                        ? { opacity: 0 }
                        : placement === "center"
                          ? zoomReveal.exit
                          : { y: 30, opacity: 0, scale: 0.98 }
                }
                transition={
                    reducedMotion
                        ? { duration: 0 }
                        : placement === "center"
                          ? zoomReveal.transition
                          : { ...spring.bouncy, opacity: { duration: 0.18 } }
                }
            >
                <motion.div
                    className="flex min-h-0 flex-1 flex-col overflow-y-auto"
                    initial={reducedMotion ? false : contentCrossfade.initial}
                    animate={reducedMotion ? undefined : contentCrossfade.animate}
                    exit={reducedMotion ? undefined : contentCrossfade.exit}
                    transition={reducedMotion ? { duration: 0 } : contentCrossfade.transition}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}
