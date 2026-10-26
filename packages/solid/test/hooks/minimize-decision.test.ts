import { expect, test } from "vitest"
import { minimizeDecision } from "../../src/hooks/scroll/minimize-decision"

test("restoring a scroll position does not minimize chrome", () => {
    expect(minimizeDecision(480, 0, false)).toBe(null)
    expect(minimizeDecision(0, 480, false)).toBe(false)
})
test("slow scrolling accumulates until a direction is clear", () => {
    expect(minimizeDecision(105, 100, true)).toBe(null)
    expect(minimizeDecision(113, 100, true)).toBe(true)
    expect(minimizeDecision(99, 113, true)).toBe(false)
})
