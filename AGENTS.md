# Passui repository

This public Bun workspace repository owns Passui's framework independent
UI, its optional TanStack integration and its CLI. Develop it as its own checkout, conventionally `~/pherus/passui`.
Pherus consumes published npm releases, not a submodule or sibling files. The official website lives in `www/` here; Pherus apps
remain outside this repo.

## Packages

* `packages/tokens`, `@passui/tokens`: shared framework independent tokens and styles.
* `packages/solid`, `@passui/solid`: native SolidJS controls, appearance and examples. See `packages/solid/README.md`.
* `packages/ui`, `@passui/react`: native React controls,
  appearance, typed docs and examples. See `packages/ui/AGENTS.md`.
* `packages/tanstack`, `@passui/tanstack`: optional form, table,
  router and query integrations. See `packages/tanstack/AGENTS.md`.
* `packages/cli`, `@passui/cli`: project setup tooling. See
  `packages/cli/AGENTS.md` for file safety and starter conventions.

Dependency direction is CLI setup tooling and optional integrations
toward the UI and shared tokens. The UI itself remains independent of TanStack and CLI.
Use package specifiers across package boundaries. Keep dependency
versions explicit so this repo works without Pherus's catalogs.

Tests, helpers and fixtures live in each package's `test/` directory,
outside `src/`. Shared tokens and their tests live in `packages/tokens`.

## Checks and publishing

Scrollbar chrome is forbidden throughout Passui. Shared base styles hide it while preserving scrolling.

Use Bun for installation, typecheck and packing; tests run on Vitest
through Vitest (`vitest run`, importing from `vitest`), and
`bun run check` runs Biome from the root `biome.json`.
The CLI's test script builds `dist/passui.js` first and tests the
published bin. Root scripts
run the matching task across Passui packages. CI and public npm release
workflows live in this repository, not private Pherus.

`publish.yml` uses GitHub environment `npm-publish` and job scoped
`id-token: write`. npm publishes Bun packed tarballs using OIDC;
no npm token secret is needed. Each package needs its own npm trusted
publisher matching `phe-rus/passui`, `publish.yml` and `npm-publish`.
Publish tokens before React or Solid, and changed UI runtimes before TanStack. npm versions
cannot be overwritten. Credentials stay outside tracked files.

Route files contain only imports, `export const Route` and an optional
`function RouteComponent()`. Helpers and data belong in domains.

For setup, architecture, testing, npm releases and website deployment,
read [the contributor guide](CONTRIBUTING.md). For changes to public
URLs or metadata, read [the SEO guide](docs/seo.md).

Use ChromeOS Chrome for browser checks. In Crostini, open links through
`/usr/bin/garcon-url-handler`. Do not launch a Linux or embedded browser.

For unfinished React and docs refinement, start with git status and
[the checkpoint](docs/architecture/react-refinement-resume.md). Keep reads,
tool output and updates short; reuse recorded decisions and passing checks.
