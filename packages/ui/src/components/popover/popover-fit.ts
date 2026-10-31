import {
    type PlacementFrame,
    placeInViewport,
} from "../../lib/anchored-placement"

interface PanelRect {
    left: number
    top: number
    width: number
    height: number
}

interface AnchorRect {
    top: number
    bottom: number
}

export interface PopoverFit {
    shiftX: number
    shiftY: number
    maxWidth: number
    maxHeight?: number
    above: boolean
}

/** Keep an absolutely positioned popover visible without scaling its contents. */
export function fitPopover(
    panel: PanelRect,
    anchor: AnchorRect | undefined,
    frame: Pick<PlacementFrame, "viewport" | "edges">,
    gap = 6,
    origin: "top-left" | "top-right" = "top-left"
): PopoverFit {
    const { viewport, edges } = frame
    const topEdge = edges.top
    const bottomEdge = viewport.height - edges.bottom
    const availableHeight = Math.max(0, bottomEdge - topEdge)
    const placement = placeInViewport(
        {
            ...frame,
            anchor: {
                left: panel.left,
                top: anchor?.top ?? panel.top,
                bottom: anchor?.bottom ?? panel.top,
            },
        },
        panel.width,
        panel.height,
        gap
    )

    const above = Boolean(
        anchor &&
            panel.top + panel.height > bottomEdge &&
            placement.above
    )
    const aboveHeight = anchor
        ? Math.max(0, anchor.top - topEdge - gap)
        : 0
    const visibleHeight = above
        ? Math.min(panel.height, aboveHeight)
        : Math.min(panel.height, availableHeight)
    const desiredTop = above
        ? (anchor?.top ?? panel.top) - gap - visibleHeight
        : Math.max(
              topEdge,
              Math.min(panel.top, bottomEdge - visibleHeight)
          )
    const heightRoom = above
        ? aboveHeight
        : Math.max(0, bottomEdge - desiredTop)

    return {
        shiftX:
            placement.left -
            panel.left -
            (origin === "top-right"
                ? panel.width - placement.width
                : 0),
        shiftY: desiredTop - panel.top,
        maxWidth: Math.max(
            0,
            viewport.width - edges.left - edges.right
        ),
        maxHeight:
            panel.height > heightRoom
                ? heightRoom
                : undefined,
        above,
    }
}
