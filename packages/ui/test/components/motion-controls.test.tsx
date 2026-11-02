import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { stepLiquid } from "../../src/components/slosh-slider/liquid-step"
import { SloshSlider } from "../../src/components/slosh-slider/slosh-slider"
import { WakeSlider } from "../../src/components/wake-slider/wake-slider"
import { OneTimeCode, normalizeCode } from "../../src/components/one-time-code/one-time-code"
import { AspectRatio } from "../../src/components/aspect-ratio/aspect-ratio"
import { TextField } from "../../src/components/text-field/text-field"
import { Toggle } from "../../src/components/toggle/toggle"

test("zero viscosity is exact and a liquid overshoot rebounds inside its end stop", () => {
    expect(stepLiquid({ fill: 10, velocity: 8 }, 75, 0, 1)).toEqual({ fill: 75, velocity: 0 })
    const bounced = stepLiquid({ fill: 99, velocity: 12 }, 100, 80, 1)
    expect(bounced.fill).toBe(100)
    expect(bounced.velocity).toBeLessThan(0)
})

test("liquid springs remain bounded and park exactly at their targets across frame rates", () => {
    for (const dt of [0.5, 1, 2.5]) {
        let state = { fill: 5, velocity: 0 }
        for (let frame = 0; frame < 1000; frame++) {
            state = stepLiquid(state, 92, 35, dt)
            expect(state.fill).toBeGreaterThanOrEqual(0)
            expect(state.fill).toBeLessThanOrEqual(100)
            expect(Number.isFinite(state.velocity)).toBe(true)
        }
        expect(state).toEqual({ fill: 92, velocity: 0 })
    }
})

test("motion sliders expose finite values and disabled keyboard state", () => {
    for (const Control of [SloshSlider, WakeSlider]) {
        const html = renderToStaticMarkup(<Control label="Playback" value={140} disabled />)
        expect(html).toContain('role="slider"')
        expect(html).toContain('aria-valuenow="100"')
        expect(html).toContain('aria-disabled="true"')
        expect(html).toContain('tabindex="-1"')
    }
})

test("codes normalize common numeric keyboards and retain one autofill input", () => {
    expect(normalizeCode("１２٣٤۵۶ - 789", 6)).toBe("123456")
    const html = renderToStaticMarkup(
        <OneTimeCode label="Verification code" value="１２34" length={4} onChange={() => {}} />
    )
    expect(html.match(/<input\b/g)).toHaveLength(1)
    expect(html).toContain('autoComplete="one-time-code"')
    expect(html).toContain('value="1234"')
    expect(html).toContain('maxLength="4"')
})

test("crop frames reject invalid ratios without changing media semantics", () => {
    const html = renderToStaticMarkup(
        <AspectRatio ratio={Number.NaN}>
            <img src="portrait.svg" alt="Portrait" />
        </AspectRatio>
    )
    expect(html).toContain("aspect-ratio:1.3333333333333333")
    expect(html).toContain('alt="Portrait"')
    expect(html).not.toContain("role=")
})

test("floating fields preserve caller accessibility and placeholders", () => {
    const html = renderToStaticMarkup(
        <TextField
            label="Email"
            labelPlacement="floating"
            placeholder="you@example.com"
            aria-invalid
            aria-describedby="email-help"
            description="Work address"
        />
    )
    expect(html).toContain('placeholder="you@example.com"')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toMatch(/aria-describedby="email-help [^"]+-description"/)
    expect(html).toContain("passui-field-outline")
})

test("rounded checkboxes keep a real input and mixed selection semantics", () => {
    const html = renderToStaticMarkup(
        <Toggle style="checkbox" label="Select all" checked={false} mixed onChange={() => {}} />
    )
    expect(html).toContain('type="checkbox"')
    expect(html).toContain('aria-checked="mixed"')
    expect(html).toContain("rounded-sm")
})
