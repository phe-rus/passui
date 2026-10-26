export type MenuRect = {
    left: number
    top: number
    width: number
    height: number
}

/** The closed surface occupies its trigger, even when the final menu flips at an edge. */
export function menuReveal(
    source: MenuRect | undefined,
    target: MenuRect
) {
    if (
        !source ||
        source.width <= 0 ||
        source.height <= 0 ||
        target.width <= 0 ||
        target.height <= 0
    )
        return {
            x: 0,
            y: 0,
            scaleX: 0.96,
            scaleY: 0.96,
            opacity: 0,
        }
    return {
        x:
            source.left +
            source.width / 2 -
            target.left -
            target.width / 2,
        y:
            source.top +
            source.height / 2 -
            target.top -
            target.height / 2,
        scaleX: source.width / target.width,
        scaleY: source.height / target.height,
        opacity: 1,
    }
}

/** Stretch across the action group before opening vertically; reverse on dismissal. */
export function toolbarMenuReveal(
    source: MenuRect,
    toolbar: MenuRect,
    target: MenuRect
) {
    const start = menuReveal(source, target)
    const stretched = menuReveal(
        {
            ...toolbar,
            top: source.top,
            height: source.height,
        },
        target
    )
    return {
        enter: {
            x: [start.x, stretched.x, 0],
            y: [start.y, stretched.y, 0],
            scaleX: [start.scaleX, stretched.scaleX, 1],
            scaleY: [start.scaleY, stretched.scaleY, 1],
            opacity: 1,
        },
        exit: {
            x: [0, stretched.x, start.x],
            y: [0, stretched.y, start.y],
            scaleX: [1, stretched.scaleX, start.scaleX],
            scaleY: [1, stretched.scaleY, start.scaleY],
            opacity: 1,
        },
    }
}
