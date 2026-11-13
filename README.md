# Passui

Native React controls, design tokens and setup tooling, built for any
React framework.

Docs and live playgrounds: [passui.pherus.org](https://passui.pherus.org).

| Package            | Directory           | Purpose                              |
| ------------------ | ------------------- | ------------------------------------ |
| `@passui/react`    | `packages/ui`       | Native React controls and appearance |
| `@passui/tanstack` | `packages/tanstack` | Optional TanStack integrations       |
| `@passui/tokens`   | `packages/tokens`   | Shared tokens and styles             |
| `@passui/cli`      | `packages/cli`      | Project setup tooling                |

Passui's controls work without the optional TanStack integration or CLI. The official website lives
in `www/` and consumes these packages. Run `bun run --cwd www dev`
for local development, or `bun run build:website` for its Worker build.

```bash
bunx @passui/cli init
bunx @passui/cli create my-app --template tanstack
```

Use one stylesheet import and public component entry points:

```css
@import "@passui/react/styles.css";
```

```tsx
import { Button } from "@passui/react/button";

export function Continue() {
	return <Button>Continue</Button>;
}
```

The catalog includes native Accordion, ComboBox, RadioGroup, Breadcrumb,
Skeleton, Empty, CodeBlock, KeyboardShortcut, Command,
OneTimeCode, AspectRatio, SloshSlider and WakeSlider. Use `Toggle`
with `style="checkbox"` for checkboxes. Names follow SwiftUI where the concepts
match; see [component coverage](docs/architecture/component-coverage.md).

Repository development:

```bash
bun install
bun run typecheck
bun run test
bun run size:check
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
Package release procedure: see [the local checkpoint](docs/passui-release.md).
