import { onCleanup } from "solid-js"
import { haptic } from "../../lib/haptics"
import {
    type ContextMenuItem,
    openContextMenu,
} from "./context-menu-store"

const LONG_PRESS_MS = 480
const MOVE_TOLERANCE = 10

/**
 * Right-click on desktop, long-press on touch screens: both open the same
 * menu of actions. Spread the returned handlers onto the element.
 */
export function useContextMenu(
    items: () => ContextMenuItem[]
) {
    let press: {
        x: number
        y: number
        timer: ReturnType<typeof setTimeout>
    } | null = null
    let suppressClick = false

    const cancel = () => {
        if (press) clearTimeout(press.timer)
        press = null
    }

    onCleanup(cancel)
    return {
        onContextMenu(
            event: MouseEvent & { currentTarget: HTMLElement }
        ) {
            event.preventDefault()
            cancel()
            openContextMenu(
                event.clientX,
                event.clientY,
                items(),
                false,
                event.currentTarget
            )
        },
        onPointerDown(
            event: PointerEvent & {
                currentTarget: HTMLElement
            }
        ) {
            if (event.pointerType !== "touch") return
            const { clientX: x, clientY: y } = event
            const anchor = event.currentTarget
            cancel()
            press = {
                x,
                y,
                timer: setTimeout(() => {
                    press = null
                    suppressClick = true
                    haptic("medium")
                    openContextMenu(
                        x,
                        y,
                        items(),
                        true,
                        anchor
                    )
                }, LONG_PRESS_MS),
            }
        },
        onPointerMove(
            event: PointerEvent & {
                currentTarget: HTMLElement
            }
        ) {
            const start = press
            if (
                start &&
                Math.hypot(
                    event.clientX - start.x,
                    event.clientY - start.y
                ) > MOVE_TOLERANCE
            ) {
                cancel()
            }
        },
        onPointerUp: cancel,
        onPointerCancel: cancel,
        // Attach natively so the long press ending tap is intercepted before app handlers.
        ref(element: HTMLElement) {
            const suppress = (event: MouseEvent) => {
                if (!suppressClick) return
                suppressClick = false
                event.preventDefault()
                event.stopImmediatePropagation()
            }
            element.addEventListener("click", suppress, true)
            onCleanup(() =>
                element.removeEventListener(
                    "click",
                    suppress,
                    true
                )
            )
        },
    }
}
