import { springs } from "@passui/tokens/motion"
import type { Transition } from "motion/react"

/** Design-token springs as motion/react transitions. */
export const spring = {
    smooth: { type: "spring", ...springs.smooth },
    snappy: { type: "spring", ...springs.snappy },
    bouncy: { type: "spring", ...springs.bouncy },
} as const satisfies Record<keyof typeof springs, Transition>

/**
 * Apple's fluid overshoot: cubic-bezier(0.34, 1.56, 0.1, 1).
 * Replaces traditional ease profiles with an authentic fluid bounce
 * that overshoots and settles, matching Apple's custom interface physics.
 * Used for zoom/matched-geometry transitions where the surface emerges
 * from the trigger and snaps into place with a physical bounce.
 */
export const fluidOvershoot = {
    duration: 0.4,
    ease: [0.34, 1.56, 0.1, 1] as [number, number, number, number],
} as const

/**
 * Exit motion: content collapses back toward its source.
 * The surface shrinks toward the trigger's position while fading,
 * like a water drop absorbing back into its origin.
 */
export const fluidCollapse = {
    duration: 0.28,
    ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
} as const

export type FloatingPanelSide = "above" | "below"

/**
 * Anchored panels settle toward their source without shrinking their text.
 * Now uses origin-based scaling: the panel grows from the trigger's
 * position (transform-origin set by the caller) with a scale + opacity
 * crossfade, rather than a plain slide.
 */
export function floatingPanelMotion(side: FloatingPanelSide = "below") {
    const direction = side === "above" ? 1 : -1
    return {
        initial: { opacity: 0, scale: 0.92, y: direction * 6 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: direction * 4 },
        transition: {
            ...fluidOvershoot,
            opacity: { duration: 0.16, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
        },
    } as const
}

/** Default below-anchor presentation, retained for existing consumers. */
export const popoverMotion = floatingPanelMotion()

/**
 * Zoom/matched-geometry transition for dialogs and center-placed sheets.
 * The surface starts small (scale 0.88) and invisible, then grows to
 * full size with the fluid overshoot bounce. Content elements inside
 * crossfade in slightly delayed so they phase into visibility
 * asynchronously — not a harsh switch.
 */
export const zoomReveal = {
    initial: { opacity: 0, scale: 0.88 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.92 },
    transition: fluidOvershoot,
} as const

/**
 * Content crossfade for elements inside an overlay.
 * Rather than a harsh switch, sub-elements scale and phase into
 * visibility asynchronously. Use for children of dialogs, sheets,
 * and popovers — the container arrives first, then content fades in.
 */
export const contentCrossfade = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: {
        duration: 0.24,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        delay: 0.04,
    },
} as const

/** Floating bars that rise from the bottom edge. */
export const riseMotion = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
    transition: spring.smooth,
} as const
