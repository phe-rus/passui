/** A calendar day, with `month` counted from 1. */
export interface CalendarDay {
    year: number
    month: number
    day: number
}

/** Reads `YYYY-MM-DD`; null for anything else, or a date that doesn't exist. */
export function parseDay(value: string): CalendarDay | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (!match) return null
    const [year, month, day] = [
        Number(match[1]),
        Number(match[2]),
        Number(match[3]),
    ]
    const date = new Date(Date.UTC(year, month - 1, day))
    const real =
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    return real ? { year, month, day } : null
}

export function formatDay({
    year,
    month,
    day,
}: CalendarDay): string {
    const pad = (value: number, width: number) =>
        String(value).padStart(width, "0")
    return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`
}

/** Moves by whole days, across months and years. */
export function addDays(
    day: CalendarDay,
    count: number
): CalendarDay {
    const date = new Date(
        Date.UTC(day.year, day.month - 1, day.day + count)
    )
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
    }
}

/** Moves by months, keeping the day where the month allows (31 Jan + 1 is 28 or 29 Feb). */
export function addMonths(
    day: CalendarDay,
    count: number
): CalendarDay {
    const first = new Date(
        Date.UTC(day.year, day.month - 1 + count, 1)
    )
    const year = first.getUTCFullYear()
    const month = first.getUTCMonth() + 1
    const last = new Date(
        Date.UTC(year, month, 0)
    ).getUTCDate()
    return { year, month, day: Math.min(day.day, last) }
}

/**
 * The first day of the week where `locale` is used, 1 (Monday) to 7
 * (Sunday), from the browser where it knows, else Monday except in the
 * places that start on Sunday.
 */
export function firstWeekday(locale: string): number {
    try {
        const info = new Intl.Locale(
            locale
        ) as Intl.Locale & {
            getWeekInfo?: () => { firstDay: number }
            weekInfo?: { firstDay: number }
        }
        const first =
            info.getWeekInfo?.().firstDay ??
            info.weekInfo?.firstDay
        if (first) return first
        const region = info.maximize().region ?? ""
        return [
            "US",
            "CA",
            "JP",
            "KR",
            "TW",
            "BR",
            "MX",
            "IL",
            "PH",
            "IN",
        ].includes(region)
            ? 7
            : 1
    } catch {
        return 1
    }
}

/** Six weeks covering `year`/`month`, starting on `firstDay` (1 to 7). */
export function monthGrid(
    year: number,
    month: number,
    firstDay: number
): Array<CalendarDay & { inMonth: boolean }> {
    // getUTCDay counts Sunday as 0; weeks here count it as 7.
    const weekday =
        new Date(Date.UTC(year, month - 1, 1)).getUTCDay() ||
        7
    const lead = (weekday - firstDay + 7) % 7
    const start = addDays({ year, month, day: 1 }, -lead)
    return Array.from({ length: 42 }, (_, index) => {
        const day = addDays(start, index)
        return {
            ...day,
            inMonth: day.month === month && day.year === year,
        }
    })
}

/** Whether `value` (`YYYY-MM-DD`) lies within the optional bounds. */
export function withinBounds(
    value: string,
    min?: string,
    max?: string
): boolean {
    return (!min || value >= min) && (!max || value <= max)
}
