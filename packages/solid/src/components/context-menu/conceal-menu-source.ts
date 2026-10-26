type ConcealedSource = {
    count: number
    opacity: string
    inert: boolean
}
const sources = new WeakMap<HTMLElement, ConcealedSource>()

/** Follow-up menus share ownership until the last surface finishes closing. */
export function concealMenuSource(
    element: HTMLElement,
    inert: boolean
) {
    const state = sources.get(element) ?? {
        count: 0,
        opacity: element.style.opacity,
        inert: element.inert,
    }
    state.count += 1
    sources.set(element, state)
    element.style.opacity = "0"
    if (inert) element.inert = true
    let active = true
    return () => {
        if (!active) return false
        active = false
        state.count -= 1
        if (state.count) return false
        element.style.opacity = state.opacity
        element.inert = state.inert
        sources.delete(element)
        return true
    }
}
