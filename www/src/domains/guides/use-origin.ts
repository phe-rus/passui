import { useEffect, useState } from "react"

/** Where the site will live once deployed (Stage 6 of the docs spec). */
const plannedOrigin = "https://passui.pherus.org"

/**
 * The site's own address, for commands people copy. The server can't
 * know it, so the first render uses the planned address and the browser
 * swaps in the real one.
 */
export function useOrigin() {
    const [origin, setOrigin] = useState(plannedOrigin)
    useEffect(() => setOrigin(window.location.origin), [])
    return origin
}
