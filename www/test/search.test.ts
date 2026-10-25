import { describe, expect, test } from "vitest"
import {
    componentSearchSchema,
    docsSettingsSchema,
    previewSearchSchema,
} from "@/domains/settings/types"

describe("search params", () => {
    test("a bare address gets every default", () => {
        expect(docsSettingsSchema.parse({})).toEqual({
            theme: "system",
            accent: "blush",
            os: "auto",
            viewport: "fill",
        })
    })

    test("valid values are kept", () => {
        expect(
            docsSettingsSchema.parse({
                theme: "dark",
                accent: "ocean",
                os: "android",
                viewport: "phone",
            })
        ).toEqual({
            theme: "dark",
            accent: "ocean",
            os: "android",
            viewport: "phone",
        })
    })

    test("each bad value falls back on its own, without an error", () => {
        expect(
            docsSettingsSchema.parse({
                theme: "purple",
                accent: "ocean",
                os: 42,
                viewport: "watch",
            })
        ).toEqual({
            theme: "system",
            accent: "ocean",
            os: "auto",
            viewport: "fill",
        })
    })

    test("props that aren't an object fall back to none", () => {
        expect(
            componentSearchSchema.parse({ props: "oops" })
                .props
        ).toEqual({})
        expect(
            componentSearchSchema.parse({
                props: { size: "lg" },
            }).props
        ).toEqual({ size: "lg" })
    })

    test("the preview page falls back the same way", () => {
        const parsed = previewSearchSchema.parse({
            theme: "nope",
            scene: "elsewhere",
        })
        expect(parsed.theme).toBe("system")
        expect(parsed.scene).toBe("component")
    })
})
