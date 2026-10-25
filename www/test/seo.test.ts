import { existsSync } from "node:fs"
import { describe, expect, test } from "vitest"
import { getPageHead } from "@/domains/seo/get-page-head"
import {
    getRobots,
    getSitemap,
    getSitemapPaths,
} from "@/domains/seo/sitemap"
import { getCatalog } from "@/domains/catalog/get-catalog"
import { guides } from "@/domains/guides/get-guides"

describe("search discovery", () => {
    test("every public guide and component has one canonical sitemap URL", () => {
        const paths = getSitemapPaths()
        expect(paths).toHaveLength(
            1 + guides.length + getCatalog().length
        )
        expect(paths).toContain("/")
        for (const guide of guides)
            expect(paths).toContain(guide.path)
        for (const entry of getCatalog())
            expect(paths).toContain(
                `/components/${entry.docs.slug}`
            )
        const xml = getSitemap()
        for (const path of paths) {
            const head = getPageHead(
                path,
                "Page · Passui",
                "Description"
            )
            expect(xml).toContain(
                `<loc>${head.links[0].href}</loc>`
            )
        }
        expect(xml).not.toMatch(/preview|llms|SKILL|lastmod/)
        expect(getRobots()).toContain(
            "Sitemap: https://passui.pherus.org/sitemap.xml"
        )
        expect(getRobots()).not.toContain(
            "Disallow: /preview"
        )
    })

    test("playground settings and trailing slashes cannot split canonical URLs", () => {
        const head = getPageHead(
            "/components/button/?theme=dark#example",
            "Button · Passui",
            "A button"
        )
        expect(head.links).toEqual([
            {
                rel: "canonical",
                href: "https://passui.pherus.org/components/button",
            },
        ])
        expect(head.meta).toContainEqual({
            property: "og:url",
            content: head.links[0].href,
        })
        const graph = JSON.parse(head.scripts[0].children)[
            "@graph"
        ]
        expect(
            graph
                .find(
                    (item: { "@type": string }) =>
                        item["@type"] === "BreadcrumbList"
                )
                .itemListElement.map(
                    (item: { name: string }) => item.name
                )
        ).toEqual(["Passui", "Components", "Button"])
    })

    test("structured data escapes HTML and describes the actual source project", () => {
        const head = getPageHead(
            "/",
            "Passui",
            "Controls </script>"
        )
        expect(head.scripts[0].children).not.toContain(
            "</script>"
        )
        const graph = JSON.parse(head.scripts[0].children)[
            "@graph"
        ]
        expect(
            graph.find(
                (item: { "@type": string }) =>
                    item["@type"] === "SoftwareSourceCode"
            ).codeRepository
        ).toBe("https://github.com/phe-rus/passui")
    })
})

test("discovery routes cannot be shadowed by static assets", () => {
    for (const file of ["robots.txt", "sitemap.xml"]) {
        expect(
            existsSync(
                new URL(`../public/${file}`, import.meta.url)
            )
        ).toBe(false)
    }
})
