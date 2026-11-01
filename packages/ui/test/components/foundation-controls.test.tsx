import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { Divider } from "../../src/components/divider/divider"
import { ProgressView } from "../../src/components/progress-view/progress-view"
import { Slider } from "../../src/components/slider/slider"
import { Stepper } from "../../src/components/stepper/stepper"
import { clampRange, stepRange } from "../../src/lib/range-value"

test("numeric ranges clamp and advance without decimal drift", () => {
    expect(clampRange(-12, 0, 5)).toBe(0)
    expect(clampRange(12, 0, 5)).toBe(5)
    expect(clampRange(Number.NaN, 0, 5)).toBe(0)
    expect(stepRange(0.2, 1, 0, 1, 0.1)).toBe(0.3)
    expect(stepRange(0.3, -1, 0, 1, 0.1)).toBe(0.2)
    expect(stepRange(0.9, 1, 0, 0.95, 0.1)).toBe(0.95)
    expect(stepRange(0, -1, 0, 1, 0.1)).toBe(0)
    expect(stepRange(1, 1, 0, 1, 0.1)).toBe(1)
})

test("slider has a named, controlled native range input", () => {
    const markup = renderToStaticMarkup(
        <Slider
            value={45}
            onChange={() => {}}
            label="Volume"
            min={0}
            max={100}
            step={5}
            description="Speaker level"
            formatValue={(value) => `${value}%`}
        />
    )
    expect(markup).toContain('type="range"')
    expect(markup).toContain('value="45"')
    expect(markup).toContain('aria-valuetext="45%"')
    expect(markup).toContain("Speaker level")
    expect(markup).toContain("Volume")
})

test("stepper disables its boundary actions and has localized action names", () => {
    const markup = renderToStaticMarkup(
        <Stepper
            value={0}
            onChange={() => {}}
            label="Copies"
            labels={{ decrement: "Fewer", increment: "More" }}
            min={0}
            max={5}
        />
    )
    expect(markup).toContain('aria-label="Fewer"')
    expect(markup).toContain('aria-label="More"')
    expect(markup).toContain('aria-live="polite"')
    expect(markup).toMatch(/aria-label="Fewer"[^>]*disabled=""/)
})

test("progress view exposes determinate and indeterminate accessible states", () => {
    const known = renderToStaticMarkup(<ProgressView label="Upload" value={150} max={200} />)
    const unknown = renderToStaticMarkup(<ProgressView label="Connecting" />)
    expect(known).toContain('aria-valuenow="150"')
    expect(known).toContain('aria-valuemax="200"')
    expect(known).toContain("width:75%")
    expect(unknown).toContain('role="progressbar"')
    expect(unknown).not.toContain("aria-valuenow")
    expect(unknown).toContain("motion-reduce:animate-none")
})

test("divider supports decorative and semantic orientations", () => {
    const decorative = renderToStaticMarkup(<Divider />)
    const vertical = renderToStaticMarkup(<Divider orientation="vertical" decorative={false} />)
    expect(decorative).toContain('role="none"')
    expect(vertical).toContain('role="separator"')
    expect(vertical).toContain('aria-orientation="vertical"')
})
