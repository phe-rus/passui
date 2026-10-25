import { expect, test } from "vitest"
import { cn } from "../../src/lib/class-names"
import { formatTime } from "../../src/lib/date"
import { shapes } from "../../src/lib/shapes"
import { accents } from "../../src/tokens"

test("framework-agnostic utilities import without react", () => {
    expect(typeof cn("a", "b")).toBe("string")
    expect(shapes.includes("circle")).toBe(true)
    expect(Object.keys(accents).length).toBeGreaterThan(0)
    expect(
        typeof formatTime(new Date("2026-01-01T12:00:00Z"))
    ).toBe("string")
})
