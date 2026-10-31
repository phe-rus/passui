import { springs } from "@passui/tokens/motion"
import type { Transition } from "motion/react"

/** Design-token springs as motion/react transitions. */
export const spring = {
    smooth: { type: "spring", ...springs.smooth },
    snappy: { type: "spring", ...springs.snappy },
    bouncy: { type: "spring", ...springs.bouncy },
} as const satisfies Record<keyof typeof springs, Transition>

export type FloatingPanelSide = "above" | "below"

/** Anchored panels settle toward their source without shrinking their text. */
export function floatingPanelMotion(
    side: FloatingPanelSide = "below"
) {
    const direction = side === "above" ? 1 : -1
    return {
        initial: { opacity: 0, scale: 1, y: direction * 6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 1, y: direction * 4 },
        transition: {
            ...spring.smooth,
            opacity: { duration: 0.16 },
        },
    } as const
}

/** Default below-anchor presentation, retained for existing consumers. */
export const popoverMotion = floatingPanelMotion()

/** Floating bars that rise from the bottom edge. */
export const riseMotion = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
    transition: spring.smooth,
} as const
