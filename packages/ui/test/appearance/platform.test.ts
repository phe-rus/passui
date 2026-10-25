import { expect, test } from "vitest"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import {
    detectPlatform,
    PlatformScript,
    resolvePlatform,
} from "../../src/appearance/platform"

test("detects the supported runtime platforms", () => {
    expect(
        detectPlatform("Mozilla Android", "Linux armv8l", 0)
    ).toBe("android")
    expect(
        detectPlatform("Mozilla iPhone", "iPhone", 5)
    ).toBe("ios")
    expect(detectPlatform("Mozilla", "MacIntel", 0)).toBe(
        "macos"
    )
    expect(detectPlatform("Mozilla", "Win32", 0)).toBe(
        "windows"
    )
    expect(detectPlatform("Mozilla", "Linux x86_64", 0)).toBe(
        "linux"
    )
    expect(detectPlatform("Mozilla", "Unknown", 0)).toBe(
        "unknown"
    )
})

test("respects a supported app override before detection", () => {
    expect(
        resolvePlatform(
            "macos",
            "Mozilla Android",
            "Linux",
            0
        )
    ).toBe("macos")
})

test("falls back to detection for an unsupported override", () => {
    expect(
        resolvePlatform(
            "unsupported",
            "Mozilla Android",
            "Linux",
            0
        )
    ).toBe("android")
})

test("treats touch enabled Mac hardware as iOS", () => {
    expect(
        resolvePlatform(null, "Mozilla", "MacIntel", 5)
    ).toBe("ios")
})

test("runs the serialized platform initializer before paint", () => {
    const markup = renderToStaticMarkup(
        createElement(PlatformScript)
    )
    const script = markup.match(
        /<script[^>]*>([\s\S]*?)<\/script>/
    )?.[1]

    if (!script)
        throw new Error("Platform script was not rendered")

    const attributes: Record<string, string> = {}
    const root = {
        getAttribute: (name: string) =>
            attributes[name] ?? null,
        setAttribute: (name: string, value: string) => {
            attributes[name] = value
        },
    }

    new Function("document", "navigator", script)(
        { documentElement: root },
        {
            userAgent: "Mozilla Android",
            platform: "Linux armv8l",
            maxTouchPoints: 0,
        }
    )

    expect(attributes["data-os"]).toBe("android")
})
