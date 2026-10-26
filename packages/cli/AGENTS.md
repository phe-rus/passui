# Passui CLI

This package owns additive project setup and maintained Vite React and TanStack Start starter templates. The behavior contract is [the CLI spec](../../docs/specs/0001-project-cli.md).

Use Node standard library APIs so the bundled executable runs under Node and Bun. Keep runtime dependencies empty unless the CLI needs an API Node does not provide. Do not transform arbitrary app roots, routes or bundler configuration. Plan every generated file before writing; preserve existing dependency versions and app source, reject file conflicts and symlinks, and run package managers with argument arrays and no shell.

`src/templates.ts` owns setup content and starter versions. Optional integrations depend on Passui, never the reverse. Generated TanStack route files contain only the Route export and RouteComponent, plus imports. Keep framework scripts as body siblings after content.

Tests, helpers and fixtures live in `test/`, separate from `src/`. Test project file operations in temporary directories. The user omitted separate clean React app release verification; do not silently add it.

Run build, typecheck, tests and publish:check. Build produces `dist/passui.js`; prepack builds the executable before packing. Public CI also checks Node can execute it. Publishing uses `phe-rus/passui`, `publish.yml` and `npm-publish` with npm OIDC.

The same CLI detects React or Solid for init and accepts `--framework`. Both Vite and TanStack Start have native Solid starters in `src/solid-templates.ts`. Keep generated provider imports, JSX settings, optional TanStack peers and source dependency compilation aligned with the selected framework; never silently choose when both runtimes are installed.
