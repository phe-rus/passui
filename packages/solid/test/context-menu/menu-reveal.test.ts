import { expect, test } from "vitest"
import {
    menuReveal,
    toolbarMenuReveal,
} from "../../src/components/context-menu/menu-reveal"

test("a menu flipped above the bottom action starts at that action's rectangle", () => {
    const reveal = menuReveal(
        { left: 280, top: 620, width: 32, height: 32 },
        { left: 120, top: 300, width: 200, height: 300 }
    )
    expect(reveal.x).toBe(76)
    expect(reveal.y).toBe(186)
    expect(200 * reveal.scaleX).toBe(32)
    expect(300 * reveal.scaleY).toBeCloseTo(32)
    expect(reveal.opacity).toBe(1)
})

test("point menus and detached empty anchors do not produce invalid transforms", () => {
    const target = {
        left: 10,
        top: 10,
        width: 200,
        height: 300,
    }
    expect(menuReveal(undefined, target).opacity).toBe(0)
    expect(
        menuReveal(
            { left: 0, top: 0, width: 0, height: 0 },
            target
        ).scaleX
    ).toBe(0.96)
})

test("toolbar menus stretch horizontally before unfolding and reverse through the same strip", () => {
    const reveal = toolbarMenuReveal(
        { left: 312, top: 42, width: 32, height: 32 },
        { left: 240, top: 42, width: 104, height: 32 },
        { left: 144, top: 42, width: 200, height: 260 }
    )
    expect(
        reveal.enter.scaleX.map((value) => value * 200)
    ).toEqual([32, 104, 200])
    expect(
        reveal.enter.scaleY.map((value) => value * 260)
    ).toEqual([32, 32, 260])
    expect(reveal.exit.x).toEqual(
        [...reveal.enter.x].reverse()
    )
    expect(reveal.exit.scaleY).toEqual(
        [...reveal.enter.scaleY].reverse()
    )
})
