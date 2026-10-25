# Contributing to Passui

Passui is an independent public repository. Clone it directly:

```bash
git clone git@github.com:phe-rus/passui.git ~/pherus/passui
cd ~/pherus/passui
bun install
bun run --cwd www dev
```

Use Node 24 (see `.node-version`) and the Bun version in `package.json`.
Wrangler and the published CLI run with Node, while Bun manages packages. The website runs at localhost:3004.
It needs no authentication, database or private application checkout.
Open browser checks in ChromeOS Chrome, using `garcon-url-handler` in
Crostini. The documentation site uses the local workspace packages.

## Ownership and architecture

`packages/ui` owns React controls and appearance. `packages/tokens` owns shared tokens and styles. `packages/solid` contains the private SolidJS foundation and native platform appearance support.
`packages/tanstack` owns optional forms, tables, routing and query
integrations. `packages/cli` owns additive setup and starter templates.
`www` owns documentation, playgrounds, catalog prose and the public Worker.
The UI remains independent of the integrations and CLI. Import across
packages through their public exports. Preserve the existing root
Biome formatting and lint rules.

Keep tests and fixtures in each package's `test/`, outside source.
Token tests remain in `packages/tokens/test/`. Route modules contain
imports, `Route`, and an optional `RouteComponent` only. Website body
scripts remain siblings after the main content through
`ComposeViewport.Window`'s `after` prop.

## Validation

```bash
bun run check
bun run --cwd packages/cli build
bun run build:website
bun run typecheck
bun run test
bun run publish:check
```

The website build generates its route tree. Website typechecks generate Worker
types; rerun `bun run --cwd www type-gen` after changing bindings.
Unit tests use Vitest directly, not Bun's test runner. CI repeats
these checks, including executing the bundled CLI with Node.

## Release packages

Update the version of each changed package and record the changes in
`CHANGELOG.md`. Check its archive with `bun run publish:check`; every
export target must exist and archives must exclude credentials and tests.
Commit and push to `main`. Run the existing `Publish Passui packages`
workflow (`publish.yml`) with package `tokens`, `ui` (React), `tanstack` or `cli`. Solid remains private and is
excluded from this workflow.
It packs with Bun and publishes with npm OIDC in the `npm-publish`
environment. Each package has a trusted publisher for `phe-rus/passui`.
No npm token belongs in the repository. Publish tokens first, then React, then the dependent TanStack
integration. Verify the public registry version before upgrading consumers.
Published npm versions cannot be overwritten.

Pherus installs explicit published versions of `@passui/react` and
`@passui/tanstack`. It does not depend on this checkout or run Passui
tasks. A release upgrade there is a separate dependency change; validate
the affected app builds and typechecks before deployment.

## Deploy the website

From this repository, after validation:

```bash
bun run --cwd www deploy
```

The script builds and deploys the `passui` Cloudflare Worker at
https://passui.pherus.org using `www/wrangler.jsonc`. Wrangler uses the
owner's existing Cloudflare credentials outside this repository.
Check the home page, a guide, a component, sitemap, robots and preview
headers after deployment. See [SEO](docs/seo.md) for the URL contract.

Before releasing this migration, complete [the release checkpoint](docs/passui-release.md).
External apps follow [the consumer migration guide](docs/migration-to-passui.md).
