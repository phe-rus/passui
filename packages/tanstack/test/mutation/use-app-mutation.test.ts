import { expect, test } from "vitest"

import { shouldRestoreOptimisticSnapshot } from "../../src/mutation/use-app-mutation"

test("restores the snapshot while the optimistic value is current", () => {
    const optimistic = { birthday: "2000-01-01" }
    expect(
        shouldRestoreOptimisticSnapshot(
            optimistic,
            optimistic
        )
    ).toBe(true)
})

test("preserves a newer cache value instead of rolling it back", () => {
    expect(
        shouldRestoreOptimisticSnapshot(
            { birthday: "2001-01-01" },
            { birthday: "2000-01-01" }
        )
    ).toBe(false)
})
