# Passui TanStack integrations

This package adapts native `@passui/react` controls to TanStack Form, Table and Router. Keep visual primitives in `../ui/`; keep business actions and domain copy in applications. Forms share one field/form context. Settings rows use typed Router links. Document shell scripts and devtools belong in its `after` body slot, outside main, to preserve SSR hydration.

Exports are explicit in package.json. Typecheck through Bun. Native controls must remain independent of this package: dependency direction is applications → integrations → `@passui/react`. The retired `@pherus/ui` API is not a compatibility target.

Styles: apps import `@passui/tanstack/styles.css`. It includes `@passui/react/styles.css` and registers this package's `src` with `@source`, so apps need no paths.

This is an optional public npm package, configured for `registry.npmjs.org`
with public access. `bun run publish:check` previews the tarball; Bun
resolves its Passui `workspace:^` dependency while packing. Publish Passui
first. Source exports require a TS/TSX capable bundler, React 19 and
Tailwind CSS 4; Query hooks use the application's QueryClientProvider.
Tests and helpers stay in `test/`, outside `src/`.

The Pherus `.github/workflows/publish.yml` workflow publishes this
package using npm OIDC. Its trusted publisher must match
`phe-rus/passui`, `publish.yml` and environment `npm-publish`.
This connection is separate from Passui's `phe-rus/passui` publisher.
