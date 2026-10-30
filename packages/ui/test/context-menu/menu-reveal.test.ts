import { expect, test } from "vitest"
import { menuSurfaceReveal } from "../../src/components/context-menu/menu-reveal"

test("a menu flipped above the bottom action starts at that action's rectangle", () => {
    const reveal = menuSurfaceReveal(
        { left: 280, top: 620, width: 32, height: 32 },
        { left: 120, top: 300, width: 200, height: 300 }
    )
    expect(120 + reveal.x).toBe(280)
    expect(300 + reveal.y).toBe(620)
    expect(reveal.width).toBe(32)
    expect(reveal.height).toBe(32)
    expect(reveal.opacity).toBe(1)
})

test("point menus and detached empty anchors do not produce invalid transforms", () => {
    const target = {
        left: 10,
        top: 10,
        width: 200,
        height: 300,
    }
    expect(menuSurfaceReveal(undefined, target).opacity).toBe(
        0
    )
    expect(
        menuSurfaceReveal(
            { left: 0, top: 0, width: 0, height: 0 },
            target
        ).width
    ).toBe(200)
})

test("toolbar material starts at the group's bounds without stretching its text", () => {
    const reveal = menuSurfaceReveal(
        { left: 240, top: 42, width: 104, height: 32 },
        { left: 144, top: 42, width: 200, height: 260 }
    )
    expect(reveal).toMatchObject({
        x: 96,
        y: 0,
        width: 104,
        height: 32,
        borderRadius: 16,
    })
    expect(reveal).not.toHaveProperty("scaleX")
    expect(reveal).not.toHaveProperty("scaleY")
})
