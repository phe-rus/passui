import { expect, test } from "vitest"

import {
    formatTime,
    fromTwelveHours,
    minuteChoices,
    parseTime,
    toTwelveHours,
    usesTwelveHours,
} from "../../src/components/compact-time-picker/time-value"

test("reads only real times", () => {
    expect(parseTime("18:30")).toEqual({
        hour: 18,
        minute: 30,
    })
    expect(parseTime("24:00")).toBeNull()
    expect(parseTime("6:30")).toBeNull()
    expect(formatTime({ hour: 7, minute: 5 })).toBe("07:05")
})

test("converts between clocks", () => {
    expect(toTwelveHours(0)).toEqual({ hour: 12, pm: false })
    expect(toTwelveHours(12)).toEqual({ hour: 12, pm: true })
    expect(toTwelveHours(18)).toEqual({ hour: 6, pm: true })
    expect(fromTwelveHours(12, false)).toBe(0)
    expect(fromTwelveHours(12, true)).toBe(12)
    expect(fromTwelveHours(6, true)).toBe(18)
})

test("knows each locale's clock", () => {
    expect(usesTwelveHours("en-US")).toBe(true)
    expect(usesTwelveHours("fr-FR")).toBe(false)
})

test("offers minutes in steps, keeping an exact time", () => {
    expect(minuteChoices(15)).toEqual([0, 15, 30, 45])
    expect(minuteChoices(15, 20)).toEqual([0, 15, 20, 30, 45])
})
