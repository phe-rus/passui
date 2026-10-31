import { expect, test } from "vitest"
import { fitPopover } from "../src/components/popover/popover-fit"

const frame = {
    viewport: { width: 800, height: 700 },
    edges: { top: 8, right: 8, bottom: 8, left: 8 },
}

test("popover stays in its authored position when it fits", () => {
    expect(
        fitPopover(
            { left: 160, top: 100, width: 240, height: 200 },
            { top: 52, bottom: 92 },
            frame
        )
    ).toMatchObject({
        shiftX: 0,
        shiftY: 0,
        above: false,
        maxHeight: undefined,
    })
})

test("popover opens above a trigger near the bottom edge", () => {
    expect(
        fitPopover(
            { left: 400, top: 656, width: 240, height: 200 },
            { top: 610, bottom: 650 },
            frame
        )
    ).toMatchObject({
        shiftX: 0,
        shiftY: -252,
        above: true,
        maxHeight: undefined,
    })
})

test("popover stays scrollable when neither side has enough height", () => {
    const constrained = {
        ...frame,
        viewport: { width: 800, height: 300 },
    }
    expect(
        fitPopover(
            { left: 100, top: 196, width: 240, height: 300 },
            { top: 150, bottom: 190 },
            constrained
        )
    ).toMatchObject({
        shiftY: -188,
        above: true,
        maxHeight: 136,
    })
})

test("a popover without a relative anchor clamps instead of flipping", () => {
    expect(
        fitPopover(
            { left: 600, top: 650, width: 240, height: 200 },
            undefined,
            frame
        )
    ).toMatchObject({
        shiftX: -48,
        shiftY: -158,
        above: false,
    })
})

test("a right-aligned popover accounts for width reduction", () => {
    const mobile = {
        viewport: { width: 320, height: 640 },
        edges: { top: 8, right: 8, bottom: 8, left: 8 },
    }
    expect(
        fitPopover(
            { left: -50, top: 100, width: 400, height: 200 },
            { top: 52, bottom: 92 },
            mobile,
            6,
            "top-right"
        )
    ).toMatchObject({
        maxWidth: 304,
        shiftX: -38,
    })
})

test("visual viewport offsets keep a panned mobile popover inside view", () => {
    const panned = {
        viewport: { width: 400, height: 460 },
        edges: { top: 120, right: 8, bottom: 8, left: 40 },
    }
    expect(
        fitPopover(
            { left: 20, top: 400, width: 250, height: 200 },
            { top: 345, bottom: 390 },
            panned
        )
    ).toMatchObject({
        shiftX: 20,
        shiftY: -261,
        above: true,
    })
})
