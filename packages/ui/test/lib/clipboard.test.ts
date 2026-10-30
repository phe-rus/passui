import { afterEach, expect, test, vi } from "vitest"
import { copyText } from "@passui/react/clipboard"

afterEach(() => vi.unstubAllGlobals())

test("copies the exact text and waits for confirmation", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal("navigator", { clipboard: { writeText } })
    expect(await copyText("first line\nsecond line")).toBe(
        true
    )
    expect(writeText).toHaveBeenCalledWith(
        "first line\nsecond line"
    )
})

test("denied access is reported as failure, never success", async () => {
    vi.stubGlobal("navigator", {
        clipboard: {
            writeText: vi
                .fn()
                .mockRejectedValue(new Error("Not allowed")),
        },
    })
    expect(await copyText("private draft")).toBe(false)
})

test("unavailable clipboard and server rendering remain safe", async () => {
    vi.stubGlobal("navigator", {})
    expect(await copyText("draft")).toBe(false)
    vi.stubGlobal("navigator", undefined)
    expect(await copyText("draft")).toBe(false)
})
