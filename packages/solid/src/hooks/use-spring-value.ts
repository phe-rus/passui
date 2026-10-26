import { createSignal, onCleanup, onMount, type Accessor } from "solid-js"
import { springs, type Spring } from "@passui/tokens/motion"
import { advanceSpring, springAtRest, type SpringState } from "../lib/spring"

export interface SpringValue {
    value: Accessor<number>
    /** Retarget without discarding the current velocity. */
    to: (target: number, velocity?: number) => void
    /** Follow a pointer exactly; discard prior momentum and pending frames. */
    jump: (position: number) => void
    stop: () => void
}

/**
 * An interruptible SolidJS spring. There are no fixed-duration tweens or
 * per-component timers. One requestAnimationFrame loop runs only while moving.
 *
 * Call inside a Solid owner. The initial value is stable during SSR; browser
 * motion starts only after mounting.
 */
export function useSpringValue(
    initial: number,
    config: Spring = springs.snappy
): SpringValue {
    const [value, setValue] = createSignal(initial)
    let state: SpringState = { position: initial, velocity: 0 }
    let target = initial
    let frame = 0
    let lastTime: number | undefined
    let mounted = false
    let reduceMotion = false

    const stop = () => {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        lastTime = undefined
    }

    const tick = (timestamp: number) => {
        frame = 0
        const seconds = lastTime === undefined
            ? 0
            : Math.min(Math.max((timestamp - lastTime) / 1000, 0), 0.064)
        lastTime = timestamp
        state = advanceSpring(state, target, seconds, config)
        if (springAtRest(state, target)) {
            state = { position: target, velocity: 0 }
        }
        setValue(state.position)
        if (state.position !== target || state.velocity !== 0) {
            frame = requestAnimationFrame(tick)
        } else {
            lastTime = undefined
        }
    }

    const jump = (position: number) => {
        stop()
        target = position
        state = { position, velocity: 0 }
        setValue(position)
    }

    const to = (nextTarget: number, velocity?: number) => {
        if (!Number.isFinite(nextTarget)) return
        target = nextTarget
        if (velocity !== undefined && Number.isFinite(velocity)) {
            state = { ...state, velocity }
        }
        if (!mounted || reduceMotion) {
            jump(nextTarget)
            return
        }
        if (!frame && !springAtRest(state, target)) {
            lastTime = undefined
            frame = requestAnimationFrame(tick)
        }
    }

    onMount(() => {
        mounted = true
        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        const onPreference = () => {
            reduceMotion = media.matches
            if (reduceMotion) jump(target)
        }
        onPreference()
        media.addEventListener("change", onPreference)
        onCleanup(() => {
            media.removeEventListener("change", onPreference)
            mounted = false
            stop()
        })
    })

    return { value, to, jump, stop }
}
