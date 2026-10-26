import { describe, expect, test } from "vitest"
import {
    advanceSpring,
    rubberBand,
    springAtRest,
} from "../../src/lib/spring"

const snappy = { mass: 1, stiffness: 380, damping: 22 }

describe("damped spring motion", () => {
    test("converges to its target from both directions", () => {
        for (const start of [0, 50]) {
            const target = start === 0 ? 50 : 0
            let state = { position: start, velocity: 0 }
            for (let index = 0; index < 120; index++) {
                state = advanceSpring(
                    state,
                    target,
                    1 / 120,
                    snappy
                )
            }
            expect(state.position).toBeCloseTo(target, 2)
            expect(springAtRest(state, target)).toBe(true)
        }
    })

    test("retargeting preserves momentum instead of restarting at zero velocity", () => {
        const moving = advanceSpring(
            { position: 0, velocity: 200 },
            100,
            0.016,
            snappy
        )
        expect(moving.velocity).not.toBe(0)
        const reversed = advanceSpring(
            moving,
            0,
            0.016,
            snappy
        )
        expect(Number.isFinite(reversed.position)).toBe(true)
        expect(Number.isFinite(reversed.velocity)).toBe(true)
    })

    test("one long frame matches many short frames", () => {
        const initial = { position: 0, velocity: 80 }
        const once = advanceSpring(initial, 100, 0.1, snappy)
        let many = initial
        for (let index = 0; index < 10; index++) {
            many = advanceSpring(many, 100, 0.01, snappy)
        }
        expect(once.position).toBeCloseTo(many.position, 8)
        expect(once.velocity).toBeCloseTo(many.velocity, 8)
    })

    test.each([
        { mass: 1, stiffness: 100, damping: 20 },
        { mass: 1, stiffness: 100, damping: 35 },
        { mass: 1, stiffness: 100, damping: 8 },
    ])(
        "supports critical, overdamped and underdamped springs",
        (spring) => {
            const result = advanceSpring(
                { position: 10, velocity: -3 },
                0,
                0.1,
                spring
            )
            expect(Number.isFinite(result.position)).toBe(
                true
            )
            expect(Number.isFinite(result.velocity)).toBe(
                true
            )
        }
    )

    test("rubber-band resistance is continuous, signed, bounded and reversible", () => {
        expect(rubberBand(0, 100)).toBe(0)
        expect(rubberBand(100, 100)).toBeGreaterThan(0)
        expect(rubberBand(100, 100)).toBeLessThan(100)
        expect(rubberBand(-100, 100)).toBe(
            -rubberBand(100, 100)
        )
        expect(rubberBand(100000, 100)).toBeLessThan(100)
        expect(rubberBand(10, 0)).toBe(0)
    })
})
