import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "motion/react"
import { type ReactNode, useRef } from "react"
import { useVisualViewport } from "../../hooks/use-visual-viewport"
import { cn } from "../../lib/class-names"
import { spring } from "../../motion/transitions"
import { SheetPortal } from "./sheet-portal"
import { useSheetFocus } from "./use-sheet-focus"

export interface SheetProps {
    /** Controls whether the sheet is presented. */
    open: boolean
    /** Called on Escape or an outside press. */
    onClose: () => void
    /** Read out by screen readers as the sheet's name. */
    label: string
    /** ID of a visible heading to use instead of label for the accessible name. */
    labelledBy?: string
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
    label,
    labelledBy,
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
                "fixed inset-0 z-[65] flex items-end justify-center",
                "sm:items-center sm:p-6"
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
                onClick={onClose}
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
                    "max-h-[92%] max-w-[560px]",
                    "rounded-t-sheet sm:rounded-sheet",
                    className
                )}
                initial={
                    reducedMotion
                        ? { opacity: 0 }
                        : { y: 40, opacity: 0, scale: 0.98 }
                }
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={
                    reducedMotion
                        ? { opacity: 0 }
                        : { y: 30, opacity: 0 }
                }
                transition={
                    reducedMotion
                        ? { duration: 0 }
                        : spring.smooth
                }
            >
                {children}
            </motion.div>
        </div>
    )
}
