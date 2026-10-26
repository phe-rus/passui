/** Programmatic restoration does not collapse chrome; reaching the top always restores it. */
export function minimizeDecision(
    top: number,
    anchor: number,
    userDriven: boolean
): boolean | null {
    if (top < 24) return false
    if (!userDriven) return null
    const delta = top - anchor
    if (delta < -12) return false
    if (delta > 12) return true
    return null
}
