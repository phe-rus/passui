# Passui CLI

Set up Passui in an existing React project:

```bash
bunx @passui/cli init
```

Create a project with Passui already wired:

```bash
bunx @passui/cli create my-app
bunx @passui/cli create my-app --template tanstack
```

With npm, use `npx @passui/cli`; with pnpm, use `pnpm dlx @passui/cli`. The executable runs on Node 22.12 or newer and Bun.

## Existing projects

Run init in the React app workspace, or pass `--dir apps/my-app`. It adds Passui, Tailwind 4 and the appropriate Tailwind plugin to package.json. Existing versions and scripts are preserved. React 18 and Tailwind 3 need an explicit upgrade first.

The CLI creates `passui/styles.css`, `passui/providers.tsx` and `passui/README.md`. Follow that README to import the stylesheet, wrap app content with the provider and configure your Tailwind pipeline. It includes Next.js source transpilation guidance. The CLI does not rewrite your app root, routes or bundler configuration.

Add `--integration tanstack` when you want the optional form, table, routing and query integration. Passui itself works without TanStack.

## Options

| Option | Effect |
|---|---|
| `--template vite` | Vite React starter, the default for create |
| `--template tanstack` | TanStack Start starter with the optional integration |
| `--pm bun\|npm\|pnpm\|yarn` | Override package manager detection |
| `--no-install` | Write files without running install |
| `--dry-run` | Show the plan without changing files or installing |
| `--help` | Show usage |

Package manager detection uses packageManager, then lockfiles, then Bun. Create accepts only an empty directory. Init can be repeated and refuses conflicting setup files or symlinks. If installation fails, generated files remain ready for a manual retry.

TanStack Start generates route types during dev or build; build once before running its typecheck. Starters target React 19 and Tailwind 4. They include a Passui Button, theme and platform providers, and overlay hosts.

## Development

```bash
bun run build
bun run typecheck
bun run test
bun run publish:check
```

Source lives in `src/`; tests and fixtures live in `test/`. Bun bundles a standalone Node executable for npm. The public repository's `publish.yml` workflow accepts `package=cli` and uses environment `npm-publish`.

[Official docs](https://passui.pherus.org/docs/installation). MIT licensed.

## React and SolidJS

`init` detects React or SolidJS from the app manifest. Use `--framework react`
or `--framework solid` to select explicitly, including in mixed projects.
`create` defaults to React and supports both Vite and TanStack Start for
both frameworks:

```bash
bunx @passui/cli@latest create my-solid-app --framework solid --template vite
bunx @passui/cli@latest create my-solid-start --framework solid --template tanstack
bunx @passui/cli@latest init --framework solid --integration tanstack
```

Solid setup uses `@passui/solid`, Solid JSX, native appearance and hosts,
and `@passui/tanstack/solid/*` when integrations are enabled. Framework
peers are installed for the selected framework only. Existing app source,
bundler configuration and dependency versions are preserved by `init`.
Follow the generated `passui/README.md` to wire an existing app.
