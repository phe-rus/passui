import { expect, test } from "vitest"

import { schedulePendingIndicator } from "../../../src/components/button/use-pending-indicator"

test("shows the pending indicator after 300 milliseconds", async () => {
    let isVisible = false
    const cancel = schedulePendingIndicator(() => {
        isVisible = true
    })

    await new Promise((resolve) => setTimeout(resolve, 320))

    expect(isVisible).toBe(true)
    cancel()
})

test("cancels the pending indicator when the action finishes early", async () => {
    let isVisible = false
    const cancel = schedulePendingIndicator(() => {
        isVisible = true
    })

    cancel()
    await new Promise((resolve) => setTimeout(resolve, 320))

    expect(isVisible).toBe(false)
})
