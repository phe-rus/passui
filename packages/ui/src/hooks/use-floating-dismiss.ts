import { type RefObject, useEffect } from "react"
import { isOutsideFloatingSurface } from "../lib/floating-layers"

/** Dismiss an anchored portal without stealing focus from outside pointer interactions. */
export function useFloatingDismiss(
    surface: RefObject<HTMLElement | null>,
    anchor: HTMLElement,
    onDismiss: (restoreFocus: boolean) => void
) {
    useEffect(() => {
        const onPointer = (event: PointerEvent) => {
            if (isOutsideFloatingSurface(surface.current, anchor, event.target)) onDismiss(false)
        }
        const onFocus = (event: FocusEvent) => {
            if (isOutsideFloatingSurface(surface.current, anchor, event.target)) onDismiss(false)
        }
        const onBlur = () => onDismiss(false)

        document.addEventListener("pointerdown", onPointer, true)
        document.addEventListener("focusin", onFocus, true)
        window.addEventListener("blur", onBlur)
        return () => {
            document.removeEventListener("pointerdown", onPointer, true)
            document.removeEventListener("focusin", onFocus, true)
            window.removeEventListener("blur", onBlur)
        }
    }, [surface, anchor, onDismiss])
}
