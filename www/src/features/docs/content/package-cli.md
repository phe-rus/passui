---

title: "@passui/cli"
summary: Set up Passui in an existing project or create a starter, without touching your app code.
section: libraries
order: 13
---

```bash
bunx @passui/cli@latest init
```

With npm use `npx @passui/cli`, with pnpm `pnpm dlx @passui/cli`. It runs on Node 22.12 or newer and on Bun.

## Existing project

`init` adds Passui, Tailwind 4 and the right Tailwind plugin to `package.json`, and keeps the versions and scripts you already have. It writes `passui/styles.css`, `passui/providers.tsx` and `passui/README.md`. It does not rewrite your routes, root or bundler config: follow the generated README to import the stylesheet and wrap your app.

Pass `--dir apps/my-app` to run it from a monorepo root.

## New project

```bash
bunx @passui/cli@latest create my-app --template vite
bunx @passui/cli@latest create my-app --template tanstack
```

`create` accepts only an empty directory.

## Options

| Option                      | Effect                                               |
| --------------------------- | ---------------------------------------------------- |
| `--template vite`           | Vite starter, the default for `create`               |
| `--template tanstack`       | TanStack Start starter with the optional integration |
| `--integration tanstack`    | Add the TanStack integration to an existing project  |
| `--pm bun\|npm\|pnpm\|yarn` | Override package manager detection                   |
| `--no-install`              | Write files without installing                       |
| `--dry-run`                 | Show the plan without changing anything              |

`init` can be repeated safely and refuses to overwrite conflicting files or symlinks.
