import { expect, test } from "vitest"
import { menuPosition } from "../../src/components/context-menu/menu-position"

test("the same menu refits as the keyboard closes without changing its anchor", () => {
    const menu = {
        x: 344,
        y: 48,
        alignX: "end" as const,
        alignY: "top" as const,
    }
    const size = { width: 200, height: 600 }
    const open = menuPosition(menu, size, {
        left: 12,
        top: 48,
        right: 348,
        bottom: 505,
    })
    const closed = menuPosition(menu, size, {
        left: 12,
        top: 48,
        right: 348,
        bottom: 808,
    })
    expect(open.top).toBe(48)
    expect(open.height).toBe(457)
    expect(closed.height).toBe(600)
    expect(closed.left).toBe(open.left)
    expect(closed.top).toBe(48)
})

test("Safari panning and a menu flipped from the bottom stay within the visible bounds", () => {
    const fit = menuPosition(
        { x: 344, y: 480, alignX: "end", alignY: "bottom" },
        { width: 200, height: 300 },
        { left: 12, top: 148, right: 348, bottom: 510 }
    )
    expect(fit.top).toBe(180)
    expect(fit.top + fit.height).toBeLessThanOrEqual(510)
    expect(fit.left).toBe(144)
})
