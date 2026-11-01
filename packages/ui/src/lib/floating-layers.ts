export const FLOATING_LAYER = "data-floating-layer"

const anchors = new WeakMap<Element, Element>()

/** Portals retain the ownership of the control that opened them. */
export function registerFloatingLayer(layer: Element, anchor: Element): () => void {
    anchors.set(layer, anchor)
    return () => anchors.delete(layer)
}

export function ownsFloatingLayer(container: Element, target: Element | null): boolean {
    let layer = target?.closest(`[${FLOATING_LAYER}]`)
    const visited = new Set<Element>()
    while (layer && !visited.has(layer)) {
        visited.add(layer)
        const anchor = anchors.get(layer)
        if (!anchor) return false
        if (container.contains(anchor)) return true
        layer = anchor.closest(`[${FLOATING_LAYER}]`)
    }
    return false
}

/** An element belongs to a surface either directly or through a portaled child layer. */
export function belongsToFloatingSurface(surface: Element, target: Element | null): boolean {
    return Boolean(target && (surface.contains(target) || ownsFloatingLayer(surface, target)))
}

/** Whether a pointer target is outside both an anchored surface and its nested portals. */
export function isOutsideFloatingSurface(
    surface: Element | null,
    anchor: Element,
    target: EventTarget | null
): boolean {
    if (!target || !("closest" in target) || !("contains" in target)) return false
    const element = target as Element
    return !anchor.contains(element) && (!surface || !belongsToFloatingSurface(surface, element))
}
