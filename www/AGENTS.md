# Passui official website

`www/` is the official Passui docs website in `phe-rus/passui`, deployed as a Cloudflare Worker at `passui.pherus.org` (dev port 3004). Its words are written for people outside Pherus.

TanStack Start, React compiler, Tailwind through one import (`styles/site.css` imports `@passui/tanstack/styles.css` and adds `@source "../"`). No auth, no data, no bindings.

## Layout

- `domains/catalog`: one entry per component (`get-catalog.ts`: group, sidebar icon, docs, words), the words in `content/<slug>.ts`, and the page views (component page, overview grid, docs sidebar).
- `domains/playground`: the iframe host, controls panel, snippet generator (`get-snippet.ts`) and code view (Shiki and Prettier, both lazy loaded).
- `domains/preview`: the page inside the iframe (`/preview/$slug`), its message channel and size reporter. It mounts `Toaster`, `ContextMenuHost`, `DialogHost` and `TooltipHost` so overlays work inside it.
- `domains/settings`: the URL search schemas (theme, accent, platform, viewport, props), each key falling back on its own.
- `domains/guides`: the getting-started pages under `/docs/$slug` (Introduction, Installation, Theming, Typeset, Skills) and the `/components` entry in their list.
- `domains/ai-context`: `/llms.txt`, `/skills/passui/SKILL.md` and Copy for AI, all generated from the registry and the catalog's words. It imports catalog files directly, not `@/domains/catalog`, to avoid an import cycle.
- `domains/landing`, `domains/shell`: the home page and the site frame (header with a phone menu, footer).

Component docs code (controls, examples) lives in `../packages/ui`; see [UI guidance](../packages/ui/AGENTS.md).

The website, catalog prose, tests and reusable packages share this public repository. Pherus consumes published library releases and does not build this website. Tests stay under `test/`, outside `src/`.

## Conventions

- Route files hold only `Route` and `RouteComponent`, as everywhere in the repo.
- The page scrolls inside `<main>` (ComposeViewport fixes `<body>`), so the router resets it with `scrollToTopSelectors: ["main"]`. Keep `resetScroll: false` on navigations that only change search params.
- Pages that render per slug pass `key={slug}`, so folds and local state start over on each page.
- A playground snippet must compile when pasted: required props carry `required: true`, demo-only controls go in `omit`, and text goes through `jsxAttribute`/`jsxText`.
- Phones: the docs sidebar is hidden below `md` and opens in a Sheet from the bar naming the current page.
- The sidebar is navigation only, with collapsible groups and no search field. Header search uses `domains/shell/views/docs-search.tsx`, a native SearchList combobox in a Sheet, opened by Ctrl/Cmd K.
- Code and AI copy actions share `domains/clipboard/use-copy-text.tsx`; browser refusal opens a manual selection Sheet rather than reporting success.

## Checks

`bun run test` (snippet generator and search fallbacks), `bun run typecheck`, `bun run build`. `../packages/ui`'s `bun run test` (`vitest run`) covers the registry rules and example file names.

Page metadata lives in `domains/seo/get-page-head.ts`: canonical URLs omit playground search params, with Open Graph and Twitter summary cards using the Passui logo. Preview routes remain noindex. Installation instructions cover the public CLI and manual setup; keep generated AI setup text aligned.

`domains/seo/sitemap.ts` generates `/sitemap.xml` from the guide and
component catalogs and `/robots.txt` with the canonical sitemap URL.
No preview, settings query, AI text or invented last modified dates
belong in the sitemap. `src/server.ts` marks previews and 404 responses
noindex; preview embedding is limited to the same origin. Structured
page, website and breadcrumb data live in `get-page-head.ts`.
