/** Material 3 expressive outlines: a circle and the scalloped "cookie", "clover", and "sunny" shapes. */
export const shapes = [
    "circle",
    "cookie4",
    "cookie6",
    "cookie9",
    "clover",
    "sunny",
    /** Reserved for the Pherus mark itself, so it never matches a project's icon. */
    "cookie12",
] as const

export type Shape = (typeof shapes)[number]

/** Lobe count and wave depth (as a fraction of the radius) for each wavy shape. */
const waves: Record<
    Exclude<Shape, "circle">,
    { lobes: number; depth: number }
> = {
    cookie4: { lobes: 4, depth: 0.08 },
    cookie6: { lobes: 6, depth: 0.07 },
    cookie9: { lobes: 9, depth: 0.055 },
    clover: { lobes: 4, depth: 0.16 },
    sunny: { lobes: 8, depth: 0.045 },
    cookie12: { lobes: 12, depth: 0.04 },
}

const STEPS = 144

/**
 * An SVG path for a Material 3 expressive shape centred on (cx, cy): a circle
 * whose radius rides a cosine wave, which gives the soft scalloped "cookie",
 * "clover", and "sunny" outlines. The wave is normalised so every shape fills
 * the same `r`, keeping icons optically the same size.
 */
export function shapePath(
    shape: Shape,
    cx: number,
    cy: number,
    r: number
) {
    if (shape === "circle") {
        return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0 Z`
    }

    const { lobes, depth } = waves[shape]
    const base = r / (1 + depth)
    const points: string[] = []
    for (let i = 0; i < STEPS; i++) {
        const theta = (i / STEPS) * Math.PI * 2 - Math.PI / 2
        const radius =
            base *
            (1 +
                depth *
                    Math.cos(lobes * (theta + Math.PI / 2)))
        const x = cx + radius * Math.cos(theta)
        const y = cy + radius * Math.sin(theta)
        points.push(
            `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
        )
    }
    return `${points.join(" ")} Z`
}

/**
 * The app wide `dualTone` rule dims every svg path for two tone icons; a
 * drawn shape or illustration opts out with this so its colors stay true.
 */
export const plainSvg =
    "cursor-[inherit] [&_path]:opacity-100 [&_path]:transform-none"
