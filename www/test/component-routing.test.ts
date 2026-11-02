import { isNotFound, isRedirect } from "@tanstack/react-router"
import { expect, test } from "vitest"
import { Route } from "../src/routes/_site/_docs/components/$slug"

function loadLegacy(slug: string, search: Record<string, unknown>, hash: string) {
    const handler = Route.options.beforeLoad
    if (typeof handler !== "function") throw new Error("Legacy component redirect is missing")
    try {
        Reflect.apply(handler, undefined, [{ params: { slug }, search, location: { hash } }])
    } catch (result) {
        return result
    }
    throw new Error("Legacy component route must redirect or return 404")
}

test("legacy links preserve shared props, settings and section anchors", () => {
    const search = {
        theme: "dark",
        accent: "ocean",
        os: "android",
        viewport: "phone",
        props: { children: "Shared button" },
    }
    const result = loadLegacy("button", search, "example-pending")
    expect(isRedirect(result)).toBe(true)
    if (!isRedirect(result)) throw new Error("Expected a redirect")
    expect(result.options).toMatchObject({
        to: "/components/react/$slug",
        params: { slug: "button" },
        search,
        hash: "example-pending",
        replace: true,
    })
})

test("unknown legacy component names return 404 directly", () => {
    expect(isNotFound(loadLegacy("missing", {}, ""))).toBe(true)
})
