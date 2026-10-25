import { runInNewContext } from "node:vm"
import { createComponent } from "solid-js"
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import {
    detectPlatform,
    PlatformProvider,
    PlatformScript,
    resolvePlatform,
    usePlatform,
} from "../../src/appearance"

test.each([
    ["Mozilla Android Linux", "Linux", 5, "android"],
    ["Mozilla iPhone", "iPhone", 5, "ios"],
    ["Mozilla iPad", "iPad", 5, "ios"],
    ["Mozilla", "MacIntel", 5, "ios"],
    ["Mozilla", "MacIntel", 0, "macos"],
    ["Mozilla", "Win32", 0, "windows"],
    ["Mozilla", "Linux x86_64", 0, "linux"],
    ["", "", 0, "unknown"],
])(
    "detects %s on %s with %i touch points",
    (ua, os, touch, expected) => {
        expect(detectPlatform(ua, os, touch)).toBe(expected)
    }
)

test("preserves valid explicit platform overrides", () => {
    for (const os of [
        "ios",
        "android",
        "macos",
        "windows",
        "linux",
        "unknown",
    ]) {
        expect(
            resolvePlatform(os, "Android", "Linux", 5)
        ).toBe(os)
    }
    expect(
        resolvePlatform("invalid", "iPhone", "iPhone", 5)
    ).toBe("ios")
})

test("SSR provider and fallback render unknown without browser globals", () => {
    expect(renderToString(() => usePlatform())).toBe(
        "unknown"
    )
    expect(
        renderToString(() =>
            createComponent(PlatformProvider, {
                get children() {
                    return usePlatform()
                },
            })
        )
    ).toBe("unknown")
})

test("SSR bootstrap carries a CSP nonce and runs before the provider mounts", () => {
    const html = renderToString(() =>
        createComponent(PlatformScript, {
            nonce: "platform-test",
        })
    )
    expect(html).toContain('nonce="platform-test"')
    const source = html.match(
        /<script[^>]*>([\s\S]*?)<\/script>/
    )?.[1]
    expect(source).toBeTruthy()
    if (!source) throw new Error("Missing platform bootstrap")

    for (const override of [null, "windows", "invalid"]) {
        const attributes = new Map<string, string>()
        if (override) attributes.set("data-os", override)
        runInNewContext(source, {
            document: {
                documentElement: {
                    getAttribute: (name: string) =>
                        attributes.get(name) ?? null,
                    setAttribute: (
                        name: string,
                        value: string
                    ) => attributes.set(name, value),
                },
            },
            navigator: {
                userAgent: "Mozilla Android",
                platform: "Linux",
                maxTouchPoints: 5,
            },
        })
        expect(attributes.get("data-os")).toBe(
            override === "windows" ? "windows" : "android"
        )
    }
})
