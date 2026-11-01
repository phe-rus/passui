import { expect, test } from "vitest"
import { belongsToFloatingSurface, registerFloatingLayer } from "../../src/lib/floating-layers"

/** The ownership algorithm only requires the Element tree contract. */
class ElementNode {
    constructor(
        readonly parent: ElementNode | null = null,
        readonly floating = false
    ) {}

    contains(other: ElementNode): boolean {
        for (let item: ElementNode | null = other; item; item = item.parent) {
            if (item === this) return true
        }
        return false
    }

    closest(selector: string): ElementNode | null {
        if (selector !== "[data-floating-layer]")
            throw new Error(`Unexpected selector: ${selector}`)
        for (let item: ElementNode | null = this; item; item = item.parent) {
            if (item.floating) return item
        }
        return null
    }
}

const element = (node: ElementNode) => node as unknown as Element

test("floating children remain inside the surface that opened them", () => {
    const surface = new ElementNode()
    const trigger = new ElementNode(surface)
    const portaled = new ElementNode(null, true)
    const option = new ElementNode(portaled)
    const unregister = registerFloatingLayer(element(portaled), element(trigger))

    expect(belongsToFloatingSurface(element(surface), element(trigger))).toBe(true)
    expect(belongsToFloatingSurface(element(surface), element(option))).toBe(true)

    unregister()
    expect(belongsToFloatingSurface(element(surface), element(option))).toBe(false)
})

test("nested portals retain ownership without accepting unrelated layers", () => {
    const surface = new ElementNode()
    const trigger = new ElementNode(surface)
    const firstLayer = new ElementNode(null, true)
    const secondTrigger = new ElementNode(firstLayer)
    const secondLayer = new ElementNode(null, true)
    const unrelated = new ElementNode(null, true)
    const unregisterFirst = registerFloatingLayer(element(firstLayer), element(trigger))
    const unregisterSecond = registerFloatingLayer(element(secondLayer), element(secondTrigger))

    expect(belongsToFloatingSurface(element(surface), element(secondLayer))).toBe(true)
    expect(belongsToFloatingSurface(element(surface), element(unrelated))).toBe(false)
    expect(belongsToFloatingSurface(element(surface), null)).toBe(false)

    unregisterSecond()
    unregisterFirst()
})
