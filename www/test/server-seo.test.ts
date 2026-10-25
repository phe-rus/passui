import { describe, expect, test, vi } from "vitest"
vi.mock("@tanstack/react-start/server-entry", () => ({
    default: {
        fetch: async (request: Request) =>
            new Response("page", {
                status: new URL(
                    request.url
                ).pathname.includes("missing")
                    ? 404
                    : 200,
                headers: { "Content-Type": "text/html" },
            }),
    },
}))
import server from "../src/server"

describe("indexing response headers", () => {
    test("preview pages remain embeddable here and excluded from indexing", async () => {
        const response = await server.fetch(
            new Request(
                "https://passui.pherus.org/preview/button?theme=dark"
            )
        )
        expect(response.headers.get("X-Robots-Tag")).toBe(
            "noindex, nofollow"
        )
        expect(
            response.headers.get("Content-Security-Policy")
        ).toBe("frame-ancestors 'self'")
        expect(await response.text()).toBe("page")
    })
    test("unknown pages keep their 404 and cannot be indexed", async () => {
        const response = await server.fetch(
            new Request(
                "https://passui.pherus.org/components/missing"
            )
        )
        expect(response.status).toBe(404)
        expect(response.headers.get("X-Robots-Tag")).toBe(
            "noindex, nofollow"
        )
    })
    test("ordinary documentation responses remain indexable", async () => {
        const response = await server.fetch(
            new Request(
                "https://passui.pherus.org/components/button"
            )
        )
        expect(
            response.headers.get("X-Robots-Tag")
        ).toBeNull()
        expect(response.headers.get("Content-Type")).toBe(
            "text/html"
        )
    })
})
