import { screenEdges } from "./screen-edges"

export interface AnchoredPlacement {
    left: number
    width: number
    top?: number
    bottom?: number
    /** Opens upward, so motion should grow from the bottom edge. */
    above: boolean
    /**
     * Set when the chosen side has less room than the panel needs: the
     * panel scrolls inside this height instead of crossing the edge.
     */
    maxHeight?: number
}

/** The measurements placement decides on, so the math stays testable. */
export interface PlacementFrame {
    anchor: { top: number; bottom: number; left: number }
    viewport: { width: number; height: number }
    edges: {
        top: number
        right: number
        bottom: number
        left: number
    }
}

/**
 * Places a panel of `width` under its anchor, or above it when there's
 * less than `needed` height below and more room above, kept inside the
 * screen's safe edges.
 */
export function placeInViewport(
    { anchor, viewport, edges }: PlacementFrame,
    width: number,
    needed: number,
    gap = 6
): AnchoredPlacement {
    const fitted = Math.min(
        width,
        viewport.width - edges.left - edges.right
    )
    const left = Math.min(
        Math.max(edges.left, anchor.left),
        viewport.width - fitted - edges.right
    )
    const roomBelow =
        viewport.height - anchor.bottom - gap - edges.bottom
    const roomAbove = anchor.top - gap - edges.top
    const above = roomBelow < needed && roomAbove > roomBelow
    const room = above ? roomAbove : roomBelow
    const placement: AnchoredPlacement = {
        left,
        width: fitted,
        above,
        ...(above
            ? { bottom: viewport.height - anchor.top + gap }
            : { top: anchor.bottom + gap }),
    }
    if (room < needed) placement.maxHeight = room
    return placement
}

/** `placeInViewport` from live DOM measurements. */
export function placeAnchored(
    anchor: HTMLElement,
    width: number,
    needed: number,
    gap = 6
): AnchoredPlacement {
    const rect = anchor.getBoundingClientRect()
    const viewport = window.visualViewport
    return placeInViewport(
        {
            anchor: {
                top: rect.top,
                bottom: rect.bottom,
                left: rect.left,
            },
            viewport: {
                width: viewport?.width ?? window.innerWidth,
                height:
                    viewport?.height ?? window.innerHeight,
            },
            edges: screenEdges(),
        },
        width,
        needed,
        gap
    )
}
