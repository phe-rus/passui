/** Returns a date-only value without timezone conversion or date rollover. */
export function dateValue(
    year: string,
    month: string,
    day: string,
    max?: string
) {
    if (
        !/^\d{4}$/.test(year) ||
        !/^\d{1,2}$/.test(month) ||
        !/^\d{1,2}$/.test(day)
    )
        return ""
    const y = Number(year)
    const m = Number(month)
    const d = Number(day)
    const leap =
        y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)
    const days = [
        31,
        leap ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ]
    if (y < 1 || m < 1 || m > 12 || d < 1 || d > days[m - 1]!)
        return ""
    const value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    return max && value > max ? "" : value
}
