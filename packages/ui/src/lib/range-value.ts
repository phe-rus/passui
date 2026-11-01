/** Keep controlled numeric inputs within finite bounds without floating-point drift. */
export function clampRange(value: number, min: number, max: number): number {
    if (!Number.isFinite(value)) return min
    return Math.min(max, Math.max(min, value))
}

/** The nearest reachable step from min, optionally allowing an exact maximum. */
export function stepRange(
    value: number,
    direction: -1 | 1,
    min: number,
    max: number,
    step: number
): number {
    const precision = Math.min(12, Math.max(0, ...[min, max, step].map(decimalPlaces)))
    const factor = 10 ** precision
    const low = Math.round(min * factor)
    const high = Math.round(max * factor)
    const increment = Math.max(1, Math.round(step * factor))
    const current = Math.round(clampRange(value, min, max) * factor)
    const next =
        direction > 0
            ? low + (Math.floor((current - low) / increment) + 1) * increment
            : low + (Math.ceil((current - low) / increment) - 1) * increment
    return clampRange(Math.min(high, Math.max(low, next)) / factor, min, max)
}

function decimalPlaces(value: number): number {
    const text = String(value)
    const [mantissa, exponent] = text.toLowerCase().split("e")
    return Math.max(0, (mantissa?.split(".")[1]?.length ?? 0) - Number(exponent ?? 0))
}
