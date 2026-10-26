import { getCatalog } from "../catalog/get-catalog"
import { guides } from "../guides/get-guides"
import { pageUrl, siteOrigin } from "./site"
import { hasSolidComponent } from "@passui/solid/docs"

function escapeXml(value: string) {
    return value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&apos;",
            })[character]!
    )
}

export function getSitemapPaths() {
    return [
        ...new Set([
            "/",
            ...guides.map((guide) => guide.path),
            ...getCatalog().map(
                (entry) => `/components/${entry.docs.slug}`
            ),
            ...guides.map((guide) => `/solid${guide.path}`),
            ...getCatalog()
                .filter((entry) =>
                    hasSolidComponent(entry.docs.slug)
                )
                .map(
                    (entry) =>
                        `/solid/components/${entry.docs.slug}`
                ),
        ]),
    ]
}

export function getSitemap() {
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...getSitemapPaths().map(
            (path) =>
                `  <url><loc>${escapeXml(pageUrl(path))}</loc></url>`
        ),
        "</urlset>",
    ].join("\n")
}

// Preview pages remain crawlable so crawlers can read their noindex directive.
export function getRobots() {
    return `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`
}

export const discoveryHeaders = {
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
}
