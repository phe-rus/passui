import { expect, test } from "vitest"
import { dateValue } from "../../../src/components/date-picker/date-value"

test("preserves date-only values and pads segments", () => {
    expect(dateValue("1998", "2", "3")).toBe("1998-02-03")
})
test("validates leap years without rolling into March", () => {
    expect(dateValue("2000", "2", "29")).toBe("2000-02-29")
    expect(dateValue("1900", "2", "29")).toBe("")
    expect(dateValue("2025", "2", "29")).toBe("")
})
test("rejects impossible, incomplete and future birthdays", () => {
    for (const parts of [
        ["2020", "4", "31"],
        ["0000", "1", "1"],
        ["2020", "13", "1"],
        ["20", "1", "1"],
        ["2020", "1", "0"],
    ]) {
        expect(
            dateValue(parts[0]!, parts[1]!, parts[2]!)
        ).toBe("")
    }
    expect(dateValue("2027", "1", "1", "2026-10-10")).toBe("")
    expect(dateValue("2026", "10", "10", "2026-10-10")).toBe(
        "2026-10-10"
    )
})
