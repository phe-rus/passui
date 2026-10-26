import type { OpenMenu } from "./context-menu-store"
import type { MenuRect } from "./menu-reveal"

type MenuAnchor = Pick<
    OpenMenu,
    "x" | "y" | "alignX" | "alignY"
>
type MenuSize = Pick<MenuRect, "width" | "height">
type MenuBounds = {
    left: number
    top: number
    right: number
    bottom: number
}

/** Fit within the current visible viewport, including a keyboard or Safari pan. */
export function menuPosition(
    menu: MenuAnchor,
    size: MenuSize,
    bounds: MenuBounds
) {
    const { width, height } = size
    const { left, top, right, bottom } = bounds
    const fitsAfterX = menu.x + width <= right
    const fitsBeforeX = menu.x - width >= left
    const endX =
        menu.alignX === "end"
            ? fitsBeforeX || !fitsAfterX
            : !fitsAfterX
    const fitsBelow = menu.y + height <= bottom
    const fitsAbove = menu.y - height >= top
    const endY =
        menu.alignY === "bottom"
            ? fitsAbove || !fitsBelow
            : !fitsBelow
    const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), Math.max(min, max))
    return {
        left: clamp(
            endX ? menu.x - width : menu.x,
            left,
            right - width
        ),
        top: clamp(
            endY ? menu.y - height : menu.y,
            top,
            bottom - height
        ),
        originX: endX ? 1 : 0,
        originY: endY ? 1 : 0,
        maxHeight: Math.max(0, bottom - top),
        width,
        height: Math.min(height, Math.max(0, bottom - top)),
    }
}
