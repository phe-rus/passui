export type MenuRect = {
    left: number
    top: number
    width: number
    height: number
}

/** Animate the material's bounds independently so menu text never stretches. */
export function menuSurfaceReveal(
    source: MenuRect | undefined,
    target: MenuRect
) {
    if (
        !source ||
        source.width <= 0 ||
        source.height <= 0 ||
        target.width <= 0 ||
        target.height <= 0
    ) {
        return {
            x: 0,
            y: -4,
            width: target.width,
            height: target.height,
            opacity: 0,
            borderRadius: "var(--radius-3xl)",
        }
    }
    return {
        x: source.left - target.left,
        y: source.top - target.top,
        width: source.width,
        height: source.height,
        opacity: 1,
        borderRadius:
            Math.min(source.width, source.height) / 2,
    }
}
