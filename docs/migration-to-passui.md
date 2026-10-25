# Migrate Hino consumers to Passui

Pass and Accounts are existing consumers identified by this repository's
UI guidance. Their repositories have not been inspected or modified in this
migration. Validate each affected application separately after approved
Passui versions are published.

| Existing import | Replacement |
| --- | --- |
| `@phe-rus/hino` | `@passui/react` |
| `@phe-rus/hino/button` | `@passui/react/button` |
| `@phe-rus/hino/styles.css` | `@passui/react/styles.css` |
| `@phe-rus/hino/tokens` | `@passui/tokens` or `@passui/react/tokens` |
| `@phe-rus/hino-tanstack` subpaths | `@passui/tanstack` with the same subpath |
| `bunx @phe-rus/hino-cli` | `bunx @passui/cli` |

Install explicit approved versions of the replacement packages using the
application's package manager. Update all imports, stylesheet imports,
Next.js `transpilePackages`, aliases and dependency overrides together.
The React props, appearance providers and component export subpaths remain
available. React 19 and Tailwind CSS 4 remain required. Passui framework
packages install `@passui/tokens` as a dependency automatically.

The npm scope change requires a consumer dependency change. Existing Hino
packages remain published and continue working for applications that have
not migrated. No compatibility package or automatic npm redirect is
provided. Avoid loading both Hino and Passui in one app: their providers,
overlay stores, theme CSS and Tailwind source scans would coexist.

Existing app-owned `HinoProvider` components can keep their local names;
change their package imports. New CLI setups use `passui/` and
`PassuiProvider`. Do not run `init` as a replacement for reviewing an
existing app's root wiring. Existing `hino/` files are app-owned and are
not removed or rewritten by the new CLI. Move or merge them manually if
you choose the new setup paths.

Build the application and run its typechecks and tests after upgrading.
Check light and dark themes, platform adaptation, overlays, keyboard focus,
forms, toasts and SSR hydration in the actual app before deployment.
Source exports still require a TS/TSX-capable bundler.

SolidJS currently has only a foundation package. It is not a replacement
for the React controls, and the CLI does not provide SolidJS templates.

The canonical documentation origin becomes `https://passui.pherus.org`.
The AI skill endpoint becomes `/skills/passui/SKILL.md`. Keep the old
hostname available until approved redirects and production checks are ready.
