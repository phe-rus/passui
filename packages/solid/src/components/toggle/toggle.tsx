/** @jsxImportSource solid-js */
import { createEffect, Show } from "solid-js"
import { cn } from "../../lib/class-names"
import { haptic } from "../../lib/haptics"
import { rubberBand } from "../../lib/spring"
import { useSpringValue } from "../../hooks/use-spring-value"

export type ToggleStyle = "switch" | "checkbox"
export interface ToggleProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    disabled?: boolean
    style?: ToggleStyle
    mixed?: boolean
    labelHidden?: boolean
}

const TRACK_TRAVEL = 20
const DRAG_SLOP = 3

function SpringSwitch(props: ToggleProps) {
    const thumb = useSpringValue(
        props.checked ? TRACK_TRAVEL : 0
    )
    let pointerId: number | undefined
    let pointerStart = 0
    let thumbStart = 0
    let lastX = 0
    let lastTime = 0
    let releaseVelocity = 0
    let dragged = false
    let suppressClick = false

    createEffect(() => {
        if (pointerId === undefined) {
            thumb.to(props.checked ? TRACK_TRAVEL : 0)
        }
    })

    const onPointerDown = (
        event: PointerEvent & {
            currentTarget: HTMLButtonElement
        }
    ) => {
        if (props.disabled || event.button !== 0) return
        pointerId = event.pointerId
        pointerStart = event.clientX
        thumbStart = thumb.value()
        lastX = event.clientX
        lastTime = event.timeStamp
        releaseVelocity = 0
        dragged = false
        event.currentTarget.setPointerCapture(event.pointerId)
        thumb.jump(thumbStart)
    }
    const onPointerMove = (event: PointerEvent) => {
        if (pointerId !== event.pointerId) return
        const delta = event.clientX - pointerStart
        if (Math.abs(delta) > DRAG_SLOP) dragged = true
        if (!dragged) return
        const raw = thumbStart + delta
        const bounded = Math.max(
            0,
            Math.min(TRACK_TRAVEL, raw)
        )
        thumb.jump(
            bounded + rubberBand(raw - bounded, TRACK_TRAVEL)
        )
        const elapsed = (event.timeStamp - lastTime) / 1000
        if (elapsed > 0) {
            releaseVelocity = Math.max(
                -1000,
                Math.min(
                    1000,
                    (event.clientX - lastX) / elapsed
                )
            )
        }
        lastX = event.clientX
        lastTime = event.timeStamp
    }
    const onPointerUp = (
        event: PointerEvent & {
            currentTarget: HTMLButtonElement
        }
    ) => {
        if (pointerId !== event.pointerId) return
        pointerId = undefined
        if (
            event.currentTarget.hasPointerCapture(
                event.pointerId
            )
        ) {
            event.currentTarget.releasePointerCapture(
                event.pointerId
            )
        }
        if (dragged) {
            suppressClick = true
            const projected =
                thumb.value() + releaseVelocity * 0.06
            const checked = projected >= TRACK_TRAVEL / 2
            thumb.to(
                checked ? TRACK_TRAVEL : 0,
                releaseVelocity
            )
            if (checked !== props.checked) {
                haptic("selection")
                props.onChange(checked)
            }
        } else {
            thumb.to(props.checked ? TRACK_TRAVEL : 0)
        }
    }
    const onPointerCancel = () => {
        pointerId = undefined
        dragged = false
        suppressClick = false
        thumb.to(props.checked ? TRACK_TRAVEL : 0)
    }

    return (
        <button
            type="button"
            role="switch"
            aria-checked={props.checked}
            aria-label={props.label}
            disabled={props.disabled}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onClick={() => {
                if (suppressClick) {
                    suppressClick = false
                    return
                }
                haptic("selection")
                props.onChange(!props.checked)
            }}
            class={cn(
                "relative flex h-[30px] w-[50px] shrink-0 items-center rounded-full p-[2px] touch-pan-y transition-colors duration-normal motion-reduce:transition-none",
                "shadow-[inset_0_1px_2px_rgb(0_0_0/0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:opacity-45",
                props.checked
                    ? "bg-accent ring-1 ring-accent-text"
                    : "bg-separator/80"
            )}
        >
            <span
                aria-hidden="true"
                class="h-[26px] w-[26px] rounded-full bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.04),0_2px_4px_rgb(0_0_0/0.16),0_3px_8px_rgb(0_0_0/0.10)] will-change-transform"
                style={{
                    transform: `translate3d(${thumb.value()}px, 0, 0)`,
                }}
            />
        </button>
    )
}

export function Toggle(props: ToggleProps) {
    let input: HTMLInputElement | undefined
    createEffect(() => {
        if (input) input.indeterminate = props.mixed ?? false
    })
    return (
        <Show
            when={props.style === "checkbox"}
            fallback={<SpringSwitch {...props} />}
        >
            <label class="flex cursor-pointer items-center gap-3 text-subheadline">
                <input
                    ref={input}
                    type="checkbox"
                    aria-checked={
                        props.mixed ? "mixed" : props.checked
                    }
                    checked={props.checked}
                    disabled={props.disabled}
                    onChange={(event) =>
                        props.onChange(
                            event.currentTarget.checked
                        )
                    }
                    class="size-5 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text disabled:opacity-40"
                />
                <span
                    class={
                        props.labelHidden
                            ? "sr-only"
                            : undefined
                    }
                >
                    {props.label}
                </span>
            </label>
        </Show>
    )
}
