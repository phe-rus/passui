import { expect, test } from "vitest"
import { viewportMetrics } from "../src/hooks/viewport/viewport-metrics"

const baseline = { width: 390, height: 844 }
const input = {
    width: 390,
    height: 844,
    layoutHeight: 844,
    top: 0,
    left: 0,
    editing: false,
}

test("normal viewports retain their usable bounds", () => {
    expect(viewportMetrics(input, baseline)).toEqual({
        width: 390,
        height: 844,
        top: 0,
        left: 0,
        keyboardOpen: false,
    })
})
test("an iOS keyboard shrinks the visible rectangle without changing layout height", () => {
    expect(
        viewportMetrics(
            { ...input, height: 500, editing: true },
            baseline
        )
    ).toMatchObject({ height: 500, keyboardOpen: true })
})
test("an Android resized WebView is not reduced a second time", () => {
    expect(
        viewportMetrics(
            {
                ...input,
                height: 500,
                layoutHeight: 500,
                editing: true,
            },
            baseline
        )
    ).toMatchObject({ height: 500, keyboardOpen: true })
})
test("viewport panning keeps the bottom within the layout and keeps its offset", () => {
    expect(
        viewportMetrics(
            { ...input, height: 500, top: 80, editing: true },
            baseline
        )
    ).toMatchObject({
        height: 500,
        top: 80,
        keyboardOpen: true,
    })
    expect(
        viewportMetrics({ ...input, top: 80 }, baseline)
            .height
    ).toBe(764)
})
test("ordinary window resizing without text input is not a keyboard", () => {
    expect(
        viewportMetrics(
            { ...input, height: 500, layoutHeight: 500 },
            baseline
        ).keyboardOpen
    ).toBe(false)
})
