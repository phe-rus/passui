import { expect, test } from "vitest"
import { cn } from "../../src/lib/class-names"

test("keeps semantic text size and color utilities together", () => {
    expect(
        cn("bg-inverse text-on-inverse", "text-subheadline")
    ).toBe("bg-inverse text-on-inverse text-subheadline")
})

test("allows caller text colors to override variant colors", () => {
    expect(
        cn("text-on-inverse text-subheadline", "text-label")
    ).toBe("text-subheadline text-label")
})

test("merges text size and color independently at responsive breakpoints", () => {
    expect(
        cn(
            "text-subheadline text-label",
            "md:text-title md:text-label-secondary"
        )
    ).toBe(
        "text-subheadline text-label md:text-title md:text-label-secondary"
    )
})
