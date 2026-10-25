# Search discovery and metadata

The canonical origin is `https://passui.pherus.org`, defined once in
`www/domains/seo/site.ts`. `pageUrl` strips query strings, fragments and
trailing slashes, preserving `/` for the home page. Playground settings
therefore share the documentation page's canonical URL.

`get-page-head.ts` supplies page titles, descriptions, canonical links,
Open Graph, Twitter summary cards, and JSON LD website, page and breadcrumb
data. The home page also describes the TypeScript source repository.
The shared root supplies document metadata and icons, without a second
canonical. Keep JSON LD escaped for safe inclusion in HTML.

`sitemap.ts` builds `/sitemap.xml` from the real guide list and component
catalog. Adding a guide or documented control includes its canonical
page automatically. `/components` occurs once. The sitemap excludes
preview iframes, search variants, AI text endpoints and nonexistent pages.
Passui is currently English only, so it has no invented language alternates.
There is no reliable per page modification source, so it omits `lastmod`.

`/robots.txt` advertises the sitemap. Preview URLs stay crawlable so search
engines can see their `noindex` metadata and `X-Robots-Tag` response header.
The Worker also sends that header on 404 responses. Preview embedding
is restricted to the same origin through CSP `frame-ancestors`.

The sitemap and robots responses have explicit content types, nosniff
and a one hour cache. `www/test/seo.test.ts` checks catalog coverage,
canonical agreement, exclusions, structured data and escaping. Verify
the real rendered pages and HTTP headers when deploying. Search Console
submission is a separate owner action; a sitemap does not guarantee indexing.

This follows Pherus's data driven sitemap and shared metadata approach,
adapted to a single language documentation site.

References: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
and [canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
