# Passui

Native React controls, design tokens and setup tooling, built for any
React framework.

Docs and live playgrounds: [passui.pherus.org](https://passui.pherus.org).

| Package | Directory | Purpose |
|---|---|---|
| `@passui/react` | `packages/ui` | Native React controls and appearance |
| `@passui/tanstack` | `packages/tanstack` | Optional TanStack integrations |
| `@passui/tokens` | `packages/tokens` | Shared tokens and styles |
| `@passui/solid` | `packages/solid` | SolidJS foundation, no public controls yet |
| `@passui/cli` | `packages/cli` | Project setup tooling |

Passui's UI works without the other packages. The official website lives
in `www/` and consumes these packages. Run `bun run --cwd www dev`
for local development, or `bun run build:website` for its Worker build.

```bash
bunx @passui/cli init
bunx @passui/cli create my-app --template tanstack
```

Repository development:

```bash
bun install
bun run typecheck
bun run test
```

CI and publishing run here. Each public npm package uses a trusted
publisher for this repository's `publish.yml` workflow and the
`npm-publish` environment.

See [UI installation](packages/ui/README.md) and
[TanStack integration](packages/tanstack/README.md).

MIT licensed.

This repository works independently of Pherus. Consumers install the
published npm packages; no submodule or sibling checkout is required.
See [Contributing](CONTRIBUTING.md) for standalone setup, architecture,
validation, releases and website deployment, and [SEO](docs/seo.md) for
the sitemap and metadata contract.

Existing Hino consumers: see [the migration guide](docs/migration-to-passui.md).
Release approval and infrastructure prerequisites: see [the local checkpoint](docs/passui-release.md).
