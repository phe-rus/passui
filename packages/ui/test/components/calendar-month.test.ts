import { expect, test } from "vitest"

import {
    addDays,
    addMonths,
    firstWeekday,
    formatDay,
    monthGrid,
    parseDay,
    withinBounds,
} from "../../src/components/compact-date-picker/calendar-month"

test("reads only real dates", () => {
    expect(parseDay("2026-10-15")).toEqual({
        year: 2026,
        month: 10,
        day: 15,
    })
    expect(parseDay("2026-02-30")).toBeNull()
    expect(parseDay("")).toBeNull()
    expect(formatDay({ year: 987, month: 3, day: 4 })).toBe(
        "0987-03-04"
    )
})

test("moves across months and years", () => {
    expect(
        addDays({ year: 2026, month: 12, day: 31 }, 1)
    ).toEqual({ year: 2027, month: 1, day: 1 })
    // The day shortens to fit the month.
    expect(
        addMonths({ year: 2028, month: 1, day: 31 }, 1)
    ).toEqual({ year: 2028, month: 2, day: 29 })
    expect(
        addMonths({ year: 2026, month: 1, day: 15 }, -1)
    ).toEqual({ year: 2025, month: 12, day: 15 })
})

test("lays out six weeks from the locale's first weekday", () => {
    // October 2026 begins on a Thursday.
    const monday = monthGrid(2026, 10, 1)
    expect(monday).toHaveLength(42)
    expect(monday[0]).toMatchObject({
        year: 2026,
        month: 9,
        day: 28,
        inMonth: false,
    })
    expect(monday[3]).toMatchObject({
        month: 10,
        day: 1,
        inMonth: true,
    })
    const sunday = monthGrid(2026, 10, 7)
    expect(sunday[0]).toMatchObject({ month: 9, day: 27 })
    expect(sunday[4]).toMatchObject({ month: 10, day: 1 })
})

test("knows where weeks start", () => {
    expect(firstWeekday("en-US")).toBe(7)
    expect(firstWeekday("fr-FR")).toBe(1)
})

test("respects bounds", () => {
    expect(
        withinBounds("2026-10-15", "2026-10-01", "2026-10-31")
    ).toBe(true)
    expect(withinBounds("2026-09-30", "2026-10-01")).toBe(
        false
    )
    expect(
        withinBounds("2026-11-01", undefined, "2026-10-31")
    ).toBe(false)
})
