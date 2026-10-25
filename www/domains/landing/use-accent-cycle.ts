import { type AccentId, accents } from "@passui/react/tokens"
import { useEffect, useState } from "react"
import type { AccentCycle } from "./types"

const order = Object.keys(accents) as AccentId[]

function applyAccent(accent: AccentId) {
    const root = document.documentElement
    // Blush is the root default, so it needs no attribute.
    if (accent === "blush")
        root.removeAttribute("data-accent")
    else root.setAttribute("data-accent", accent)
}

function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
}

/** Walks the page through every accent, like a slow color carousel. */
export function useAccentCycle(
    intervalMs = 3800
): AccentCycle {
    const [accent, setAccent] = useState<AccentId>("blush")
    const [pinned, setPinned] = useState(false)
    const [held, setHeld] = useState(false)

    useEffect(() => {
        applyAccent(accent)
    }, [accent])

    // Leaving the page hands every other page back its default accent.
    useEffect(() => () => applyAccent("blush"), [])

    useEffect(() => {
        if (pinned || held || prefersReducedMotion()) return
        const timer = window.setInterval(() => {
            setAccent(
                (current) =>
                    order[
                        (order.indexOf(current) + 1) %
                            order.length
                    ]
            )
        }, intervalMs)
        return () => window.clearInterval(timer)
    }, [pinned, held, intervalMs])

    return {
        accent,
        select: (next) => {
            setPinned(true)
            setAccent(next)
        },
        hold: setHeld,
    }
}

export { order as accentOrder }
