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

async function renderNavigation() {
    const routeTree = createRootRoute({ component: DocsNav })
    const router = createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: ["/"] }),
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
    for (const { docs } of getCatalog())
        expect(
            categories.match(new RegExp(`href="/components/react/${docs.slug}"`, "g")),
            docs.slug
        ).toHaveLength(1)
    expect(categories.match(/aria-expanded="true"/g)).toHaveLength(catalogGroups.length)
})
