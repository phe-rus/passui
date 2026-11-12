# Passui official website

`www/` is the official Passui docs website in `phe-rus/passui`, deployed as a Cloudflare Worker at `passui.pherus.org` (dev port 3004). Its words are written for people outside Pherus.

TanStack Start, React compiler, Tailwind through one import (`src/styles/site.css` imports `@passui/tanstack/styles.css` and adds `@source "../"`). No auth, no data, no bindings. It is built from Passui's own components: Tabs for Preview and Code, Command in a Dialog for search, a Sheet for the phone menu.

## Layout

```
src/
  components/
    docs/      doc and guide pages, example block, props tables, sidebar, on this page
    layout/    site header, footer, search dialog, phone nav, the mark
    home/      hero and feature grid
  features/
    components/  registry.ts (one row per component), definitions/<slug>.tsx,
                 examples/<slug>/<id>.tsx, api.generated.json, navigation.ts
    guides/      guides.ts and content.tsx (Introduction, Installation, Theming, Typeset, Skills)
    ai/          llms.txt and the skill, from the registry
  lib/           site.ts, seo.ts, sitemap.ts, headers.ts (CSP and security headers), copy hook, server side Shiki and its server function
  routes/        thin route modules; (meta) holds llms, robots, sitemap
  styles/        site.css
scripts/generate-api.ts   props tables from the built declarations
test/                     registry, example and SEO tests
```

URLs: guides at `/docs/<slug>`, components at `/docs/components/<slug>`, an overview at `/docs/components`.

## Adding or changing a component page

1. Add a row to `src/features/components/registry.ts` (slug, name, group, summary, entry).
2. Write `definitions/<slug>.tsx`: `doc.examples` (id, title, description, `Demo`) and `doc.accessibility`.
3. Write each example as `examples/<slug>/<id>.tsx`, exporting exactly `<Slug><Id>` (`select/controlled.tsx` exports `SelectControlled`). The site shows the file's own source, so import from `@passui/react/...` and `@passui/icons/...` as an app would. Every page needs at least two examples. Do not name an example like a part it imports.
4. Run `bun run --cwd packages/ui build` and then `bun run docs:api` to refresh `api.generated.json`. It reads types, `@default` tags and JSDoc from `packages/ui/dist`, so describe props in JSDoc, never by hand here. It uses a separate `typescript-api` copy because TypeScript 7 has no JS API.

Component demos load per page (`import.meta.glob` in `doc-view.tsx`), so the registry stays light. Shiki and the example sources run only on the server; client navigations receive HTML.

Components marked `preview` in the registry have not been rebuilt on Zag yet and are documented as they ship.

## Conventions

- Route files hold only imports, `Route` and `RouteComponent`.
- The page scrolls inside `<main>` (ComposeViewport fixes `<body>`), so the router resets it with `scrollToTopSelectors: ["main"]`.
- Pages that render per slug pass `key={slug}` so local state starts over.
- Copy actions go through `src/lib/use-copy-text.ts`, which reports success only after a confirmed write.
- No playground iframe: examples render directly.

## Checks

`bun run test` (registry and example coverage, SEO), `bun run typecheck` (compiles every example), `bun run build`. Build the React and icons packages first (root tasks do).

`src/lib/sitemap.ts` generates `/sitemap.xml` and `/robots.txt`; see [the SEO guide](../docs/seo.md). `src/server.ts` only composes `withSiteHeaders` from `src/lib/headers.ts`; `src/start.ts` registers the CSRF middleware; `public/_headers` covers static assets. Keep each policy in its own small, named module, as the Pass app does.
