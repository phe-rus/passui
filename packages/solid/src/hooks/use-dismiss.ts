import {
    createEffect,
    onCleanup,
    type Accessor,
} from "solid-js"
import { ownsFloatingLayer } from "../lib/floating-layers"
export { FLOATING_LAYER } from "../lib/floating-layers"
export function useDismiss(
    surface: Accessor<HTMLElement | undefined>,
    active: Accessor<boolean>,
    onDismiss: () => void
) {
    createEffect(() => {
        if (!active()) return
        function pointer(event: PointerEvent) {
            const root = surface()
            const target =
                event.target instanceof Element
                    ? event.target
                    : null
            if (
                root &&
                target &&
                (root.contains(target) ||
                    ownsFloatingLayer(root, target))
            )
                return
            onDismiss()
        }
        function key(event: KeyboardEvent) {
            if (event.defaultPrevented) return
            const root = surface()
            if (
                root &&
                ownsFloatingLayer(
                    root,
                    document.activeElement
                )
            )
                return
            if (event.key === "Escape") {
                event.preventDefault()
                onDismiss()
            }
        }
        document.addEventListener("pointerdown", pointer)
        window.addEventListener("keydown", key)
        onCleanup(() => {
            document.removeEventListener(
                "pointerdown",
                pointer
            )
            window.removeEventListener("keydown", key)
        })
    })
}
