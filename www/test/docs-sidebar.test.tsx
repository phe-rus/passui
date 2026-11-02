import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import {
    createMemoryHistory,
    createRootRoute,
    createRouter,
    RouterProvider,
} from "@tanstack/react-router"
import { expect, test } from "vitest"
import { getCatalog, catalogGroups } from "@/domains/catalog/get-catalog"
import { DocsNav } from "@/domains/catalog/views/docs-nav"

async function renderNavigation(path = "/") {
    const routeTree = createRootRoute({ component: DocsNav })
    const router = createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: [path] }),
    })
    await router.load()
    return renderToStaticMarkup(createElement(RouterProvider, { router }))
}

test("sidebar distinguishes guide roots from nested component categories", async () => {
    const html = await renderNavigation()
    expect([...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((match) => match[1])).toEqual([
        "Getting started",
        "Components",
    ])
    const componentsStart = html.indexOf(">Components</h2>")
    const guides = html.slice(0, componentsStart)
    expect(guides).not.toContain('href="/components"')
    expect(guides.indexOf(">Introduction</span>")).toBeLessThan(
        guides.indexOf(">Installation</span>")
    )
    expect(html.match(/href="\/components"/g)).toHaveLength(1)
    const categories = html.slice(componentsStart)
    for (const group of catalogGroups) expect(categories).toContain(`>${group}</span>`)
    expect(categories.match(/aria-expanded="true"/g) ?? []).toHaveLength(0)
})

test("sidebar opens the current component category without expanding the whole tree", async () => {
    const html = await renderNavigation("/components/react/button")
    const categories = html.slice(html.indexOf(">Components</h2>"))
    expect(categories.match(/aria-expanded="true"/g) ?? []).toHaveLength(1)
    const active = getCatalog().find((entry) => entry.docs.slug === "button")!
    for (const { docs, group } of getCatalog()) {
        const link = `href="/components/react/${docs.slug}"`
        expect(categories.includes(link), docs.slug).toBe(group === active.group)
    }
    expect(categories.match(/aria-expanded="true"/g)).toHaveLength(1)
})
