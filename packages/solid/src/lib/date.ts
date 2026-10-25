// Dates through the platform's own Intl, no date library in the bundle.
// en-US on purpose: the server renders first, so a viewer-specific locale
// would make server and browser disagree on hydration.
const LOCALE = "en-US"

const PRESETS = {
    /** Aug 30, 2026 */
    PP: { dateStyle: "medium" },
    /** August 30, 2026 */
    PPP: { dateStyle: "long" },
    /** Aug 30, 2026, 2:15 PM */
    PPp: { dateStyle: "medium", timeStyle: "short" },
    /** August 30, 2026 at 2:15 PM */
    PPPp: { dateStyle: "long", timeStyle: "short" },
    /** Aug 30 */
    "MMM d": { month: "short", day: "numeric" },
    /** Aug 30, 14:15 */
    "MMM d, HH:mm": {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    },
    /** Aug 30, 14:15:09 */
    "MMM d, HH:mm:ss": {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
    },
} satisfies Record<string, Intl.DateTimeFormatOptions>

export type DatePreset = keyof typeof PRESETS

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(
    key: string,
    options: Intl.DateTimeFormatOptions
) {
    let cached = formatters.get(key)
    if (!cached) {
        cached = new Intl.DateTimeFormat(LOCALE, options)
        formatters.set(key, cached)
    }
    return cached
}

/** A stored UTC timestamp shown as its UTC wall-clock time, whatever the viewer's timezone. */
export function formatUtc(
    date: Date | string | number,
    preset: DatePreset
) {
    return formatter(`utc:${preset}`, {
        ...PRESETS[preset],
        timeZone: "UTC",
    }).format(new Date(date))
}

/** The viewer's local time of day, like 2:15 PM. */
export function formatTime(date: Date | string | number) {
    return formatter("local:time", {
        timeStyle: "short",
    }).format(new Date(date))
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
]

let relative: Intl.RelativeTimeFormat | undefined

/** "5 minutes ago", "in 30 days": the largest whole unit that fits. */
export function fromNow(date: Date | string | number) {
    relative ??= new Intl.RelativeTimeFormat(LOCALE, {
        numeric: "auto",
    })
    const seconds =
        (new Date(date).getTime() - Date.now()) / 1000
    for (const [unit, size] of UNITS) {
        if (Math.abs(seconds) >= size)
            return relative.format(
                Math.round(seconds / size),
                unit
            )
    }
    return relative.format(0, "second")
}
