import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "../../lib/class-names"
import { spring } from "../../motion/transitions"

export interface InlineDisclosureProps {
    /** Whether the content is expanded. */
    open: boolean
    children: ReactNode
    className?: string
}

/**
 * An inline, spring-driven reveal for settings editors and small details.
 *
 * Height and opacity animate together so following rows move continuously
 * instead of jumping. Motion is disabled when the user requests less motion.
 * The content unmounts after its exit animation completes.
 */
export function InlineDisclosure({
    open,
    children,
    className,
}: InlineDisclosureProps) {
    const reduceMotion = useReducedMotion()

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="inline-disclosure"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={
                        reduceMotion
                            ? { duration: 0 }
                            : {
                                  height: spring.smooth,
                                  opacity: { duration: 0.18, ease: "easeOut" },
                              }
                    }
                    className={cn("overflow-hidden", className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
