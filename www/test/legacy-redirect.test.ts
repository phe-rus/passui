import { expect, test } from "vitest"
import legacy from "../legacy-redirect"

test.each([
    ["/", "/"],
    [
        "/components/button?theme=dark&props=%7B%7D",
        "/components/button?theme=dark&props=%7B%7D",
    ],
    ["/skills/hino/SKILL.md", "/skills/passui/SKILL.md"],
])(
    "preserves an old documentation link: %s",
    async (path, next) => {
        const response = await legacy.fetch(
            new Request(`https://hino.pherus.org${path}`)
        )
        expect(response.status).toBe(308)
        expect(response.headers.get("Location")).toBe(
            `https://passui.pherus.org${next}`
        )
    }
)

test("does not redirect requests on unrelated hostnames", async () => {
    const response = await legacy.fetch(
        new Request(
            "https://unrelated.example/components/button"
        )
    )
    expect(response.status).toBe(404)
    expect(response.headers.has("Location")).toBe(false)
})
