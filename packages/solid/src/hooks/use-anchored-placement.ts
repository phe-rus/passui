import {
    createEffect,
    createSignal,
    onCleanup,
    type Accessor,
} from "solid-js"
import {
    placeAnchored,
    type AnchoredPlacement,
} from "../lib/anchored-placement"
export function useAnchoredPlacement(
    anchor: Accessor<HTMLElement | undefined>,
    width: Accessor<number>,
    needed: Accessor<number>
) {
    const [placement, setPlacement] =
        createSignal<AnchoredPlacement>({
            left: 0,
            width: 0,
            top: 0,
            above: false,
        })
    createEffect(() => {
        const element = anchor()
        const panelWidth = width()
        const height = needed()
        if (!element) return
        const replace = () =>
            setPlacement(
                placeAnchored(element, panelWidth, height)
            )
        replace()
        const viewport = window.visualViewport
        viewport?.addEventListener("resize", replace)
        viewport?.addEventListener("scroll", replace)
        window.addEventListener("resize", replace)
        window.addEventListener("scroll", replace, true)
        onCleanup(() => {
            viewport?.removeEventListener("resize", replace)
            viewport?.removeEventListener("scroll", replace)
            window.removeEventListener("resize", replace)
            window.removeEventListener(
                "scroll",
                replace,
                true
            )
        })
    })
    return placement
}
