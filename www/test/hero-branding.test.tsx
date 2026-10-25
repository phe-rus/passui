import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
    createMemoryHistory,
    createRootRoute,
    createRouter,
    RouterProvider,
} from "@tanstack/react-router"
import { expect, test } from "vitest"
import { Hero } from "@/domains/landing/views/hero"

test("the visible animated wordmark agrees with its accessible brand name", async () => {
    const routeTree = createRootRoute({
        component: () =>
            createElement(Hero, {
                cycle: {
                    accent: "blush",
                    hold: () => {},
                    select: () => {},
                },
            }),
    })
    const router = createRouter({
        routeTree,
        history: createMemoryHistory({
            initialEntries: ["/"],
        }),
    })
    await router.load()
    const markup = renderToStaticMarkup(
        createElement(RouterProvider, { router })
    )
    const heading = markup.match(
        /<h1\b[^>]*aria-label="([^"]+)"[^>]*>([\s\S]*?)<\/h1>/
    )
    expect(heading).not.toBeNull()
    const visibleName = heading?.[2]
        .replace(/<[^>]*>/g, "")
        .replace(/ı/g, "i")
        .toLowerCase()
    expect(visibleName).toBe("passui")
    expect(visibleName).toBe(heading?.[1].toLowerCase())
})
