/** A time of day on a 24 hour clock. */
export interface TimeOfDay {
    hour: number
    minute: number
}

/** Reads `HH:MM` (24 hour); null for anything else. */
export function parseTime(value: string): TimeOfDay | null {
    const match = /^(\d{2}):(\d{2})$/.exec(value)
    if (!match) return null
    const hour = Number(match[1])
    const minute = Number(match[2])
    return hour < 24 && minute < 60 ? { hour, minute } : null
}

export function formatTime({
    hour,
    minute,
}: TimeOfDay): string {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

/** Whether people where `locale` is used read time on a 12 hour clock. */
export function usesTwelveHours(locale: string): boolean {
    try {
        const cycle = new Intl.DateTimeFormat(locale, {
            hour: "numeric",
        }).resolvedOptions().hourCycle
        return cycle === "h11" || cycle === "h12"
    } catch {
        return false
    }
}

/** The hour as shown on a 12 hour clock (12, 1 to 11) and whether it's after noon. */
export function toTwelveHours(hour: number): {
    hour: number
    pm: boolean
} {
    return {
        hour: hour % 12 === 0 ? 12 : hour % 12,
        pm: hour >= 12,
    }
}

export function fromTwelveHours(
    hour: number,
    pm: boolean
): number {
    return (hour % 12) + (pm ? 12 : 0)
}

/** Minutes offered in steps of `step`, keeping `current` when it falls between them. */
export function minuteChoices(
    step: number,
    current?: number
): number[] {
    const choices = Array.from(
        { length: Math.ceil(60 / step) },
        (_, index) => index * step
    )
    if (current !== undefined && !choices.includes(current)) {
        choices.push(current)
        choices.sort((a, b) => a - b)
    }
    return choices
}
