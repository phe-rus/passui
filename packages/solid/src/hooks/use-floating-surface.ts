import { onCleanup, onMount, type Accessor } from "solid-js"
import {
    ownsFloatingLayer,
    registerFloatingLayer,
} from "../lib/floating-layers"
export function useFloatingSurface(
    surface: Accessor<HTMLElement | undefined>,
    anchor: Accessor<HTMLElement>,
    close: () => void
) {
    onMount(() => {
        const mountedRoot = surface()
        if (!mountedRoot) return
        const root: HTMLElement = mountedRoot
        const unregister = registerFloatingLayer(
            root,
            anchor()
        )
        function pointer(event: PointerEvent) {
            const target =
                event.target instanceof Element
                    ? event.target
                    : null
            if (
                !target ||
                root.contains(target) ||
                anchor().contains(target) ||
                ownsFloatingLayer(root, target)
            )
                return
            close()
        }
        document.addEventListener("pointerdown", pointer)
        onCleanup(() => {
            unregister()
            document.removeEventListener(
                "pointerdown",
                pointer
            )
        })
    })
}
