import { expect, test } from "vitest"
import { placeInViewport } from "../../src/lib/anchored-placement"

const frame = {
    anchor: { top: 100, bottom: 140, left: 40 },
    viewport: { width: 800, height: 600 },
    edges: { top: 8, right: 8, bottom: 8, left: 8 },
}

test("opens below the anchor when there is room", () => {
    const placed = placeInViewport(frame, 300, 200)
    expect(placed.above).toBe(false)
    expect(placed.top).toBe(146)
    expect(placed.left).toBe(40)
    expect(placed.width).toBe(300)
    expect(placed.maxHeight).toBeUndefined()
})

test("clamps to the right edge and never crosses it", () => {
    const placed = placeInViewport(
        {
            ...frame,
            anchor: { top: 100, bottom: 140, left: 700 },
        },
        300,
        200
    )
    expect(placed.left + placed.width).toBe(800 - 8)
})

test("clamps to the left edge for anchors partly off screen", () => {
    const placed = placeInViewport(
        {
            ...frame,
            anchor: { top: 100, bottom: 140, left: -30 },
        },
        300,
        200
    )
    expect(placed.left).toBe(8)
})

test("fits a panel wider than the screen", () => {
    const placed = placeInViewport(frame, 1200, 200)
    expect(placed.width).toBe(800 - 16)
    expect(placed.left).toBe(8)
})

test("opens above when below has less room than needed", () => {
    const placed = placeInViewport(
        {
            ...frame,
            anchor: { top: 300, bottom: 340, left: 40 },
            viewport: { width: 800, height: 400 },
        },
        300,
        200
    )
    expect(placed.above).toBe(true)
    expect(placed.bottom).toBe(400 - 300 + 6)
    expect(placed.maxHeight).toBeUndefined()
})

test("caps height to the room when neither side fits", () => {
    const placed = placeInViewport(
        {
            ...frame,
            anchor: { top: 200, bottom: 240, left: 40 },
            viewport: { width: 800, height: 300 },
        },
        300,
        200
    )
    // Below has 52, above has 192: above wins and is still short.
    expect(placed.above).toBe(true)
    expect(placed.maxHeight).toBe(200 - 6 - 8)
})

test("caps height below when above has even less room", () => {
    const placed = placeInViewport(
        {
            ...frame,
            anchor: { top: 30, bottom: 70, left: 40 },
            viewport: { width: 800, height: 250 },
        },
        300,
        200
    )
    // Below has 166, above only 16: below wins but is short of 200.
    expect(placed.above).toBe(false)
    expect(placed.maxHeight).toBe(250 - 70 - 6 - 8)
})
