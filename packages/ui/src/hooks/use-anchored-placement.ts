import { useLayoutEffect, useState } from "react"
import { type AnchoredPlacement, placeAnchored } from "../lib/anchored-placement"

/**
 * Places a panel of `width` and `needed` height under its anchor and
 * keeps it there: re-places while the viewport resizes or anything
 * scrolls, so it never hangs off the screen.
 */
export function useAnchoredPlacement(
    anchor: HTMLElement,
    width: number,
    needed: number,
    overlap = false
): AnchoredPlacement {
    const [placement, setPlacement] = useState(() =>
        placeAnchored(anchor, width, needed, 6, overlap)
    )

    useLayoutEffect(() => {
        const replace = () => setPlacement(placeAnchored(anchor, width, needed, 6, overlap))
        replace()
        const viewport = window.visualViewport
        viewport?.addEventListener("resize", replace)
        viewport?.addEventListener("scroll", replace)
        window.addEventListener("resize", replace)
        window.addEventListener("scroll", replace, true)
        return () => {
            viewport?.removeEventListener("resize", replace)
            viewport?.removeEventListener("scroll", replace)
            window.removeEventListener("resize", replace)
            window.removeEventListener("scroll", replace, true)
        }
    }, [anchor, width, needed, overlap])

    return placement
}
