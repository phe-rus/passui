import { expect, test } from "vitest"
import { concealMenuSource } from "../../src/components/context-menu/conceal-menu-source"

test("a follow-up keeps its toolbar hidden until both exit animations complete", () => {
    // Only the platform properties owned by the helper are needed here.
    const element = {
        style: { opacity: "0.8" },
        inert: false,
    } as HTMLElement
    const first = concealMenuSource(element, true)
    const followUp = concealMenuSource(element, true)
    expect(first()).toBe(false)
    expect(element.inert).toBe(true)
    expect(element.style.opacity).toBe("0")
    expect(followUp()).toBe(true)
    expect(element.inert).toBe(false)
    expect(element.style.opacity).toBe("0.8")
    expect(followUp()).toBe(false)
})
