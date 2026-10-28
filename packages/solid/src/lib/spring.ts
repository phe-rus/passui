import type { Spring } from "@passui/tokens/motion"

export interface SpringState {
    position: number
    velocity: number
}

/**
 * A damped harmonic oscillator, with position and velocity in the same units
 * as the animated property and its units per second.
 *
 * The closed-form solution is stable across variable frame rates and preserves
 * momentum when the target changes halfway through an animation.
 */
export function advanceSpring(
    state: SpringState,
    target: number,
    seconds: number,
    { stiffness, damping, mass }: Spring
): SpringState {
    if (seconds <= 0) return state
    if (
        !Number.isFinite(seconds) ||
        !Number.isFinite(target) ||
        stiffness <= 0 ||
        damping < 0 ||
        mass <= 0
    )
        throw new RangeError("Invalid spring parameters")

    const omega = Math.sqrt(stiffness / mass)
    const ratio = damping / (2 * Math.sqrt(stiffness * mass))
    const displacement = state.position - target
    const velocity = state.velocity
    let offset: number
    let nextVelocity: number

    if (ratio < 1 - 1e-5) {
        const decay = ratio * omega
        const frequency = omega * Math.sqrt(1 - ratio * ratio)
        const exponential = Math.exp(-decay * seconds)
        const cosine = Math.cos(frequency * seconds)
        const sine = Math.sin(frequency * seconds)
        const companion =
            (velocity + decay * displacement) / frequency
        offset =
            exponential *
            (displacement * cosine + companion * sine)
        nextVelocity =
            exponential *
            (velocity * cosine -
                (decay * companion +
                    displacement * frequency) *
                    sine)
    } else if (ratio <= 1 + 1e-5) {
        const exponential = Math.exp(-omega * seconds)
        const companion = velocity + omega * displacement
        offset =
            exponential * (displacement + companion * seconds)
        nextVelocity =
            exponential *
            (velocity - omega * companion * seconds)
    } else {
        const root = Math.sqrt(ratio * ratio - 1)
        const slow = -omega * (ratio - root)
        const fast = -omega * (ratio + root)
        const a =
            (velocity - fast * displacement) / (slow - fast)
        const b = displacement - a
        const slowTerm = a * Math.exp(slow * seconds)
        const fastTerm = b * Math.exp(fast * seconds)
        offset = slowTerm + fastTerm
        nextVelocity = slow * slowTerm + fast * fastTerm
    }

    return {
        position: target + offset,
        velocity: nextVelocity,
    }
}

/**
 * Resistance past a drag boundary. Within the allowed range, use the raw
 * pointer displacement. Outside it, this approaches the dimension without
 * ever exceeding it. This is resistance, not an animation easing curve.
 */
export function rubberBand(
    overflow: number,
    dimension: number,
    coefficient = 0.55
): number {
    if (dimension <= 0 || coefficient <= 0) return 0
    const distance = Math.abs(overflow)
    const resisted =
        dimension *
        (1 - 1 / (1 + (coefficient * distance) / dimension))
    return Math.sign(overflow) * resisted
}

export function springAtRest(
    state: SpringState,
    target: number,
    distance = 0.05,
    speed = 0.05
) {
    return (
        Math.abs(state.position - target) <= distance &&
        Math.abs(state.velocity) <= speed
    )
}

/**
 * Decide whether a directional drag should finish a gesture.
 * Distance is in pixels, velocity in pixels per second. Project a short
 * momentum horizon so a quick flick can finish without crossing the
 * distance threshold. The caller owns navigation and cancellation.
 */
export function shouldCompleteGesture(
    distance: number,
    velocity: number,
    extent: number,
    direction: 1 | -1 = 1
): boolean {
    if (
        ![distance, velocity, extent].every(
            Number.isFinite
        ) ||
        extent <= 0
    )
        return false

    const displacement = distance * direction
    const speed = velocity * direction
    if (displacement < 0) return false

    const threshold = extent * 0.35
    const projected = displacement + speed * 0.18
    return (
        displacement >= threshold ||
        (speed > 0 && projected >= threshold)
    )
}

/** Normalized interactive progress for a drag that may be cancelled. */
export function gestureProgress(
    distance: number,
    extent: number,
    direction: 1 | -1 = 1
): number {
    if (
        !Number.isFinite(distance) ||
        !Number.isFinite(extent) ||
        extent <= 0
    ) {
        return 0
    }
    return Math.min(
        1,
        Math.max(0, (distance * direction) / extent)
    )
}
