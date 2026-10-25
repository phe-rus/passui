# Passui TanStack integrations

Optional TanStack Form, Table and Router integrations for Passui's native
React controls. Passui itself works without this package.

## Install

```bash
bun add @passui/react @passui/tanstack @tanstack/react-query
```

Use React 19 and Tailwind CSS 4. Import this stylesheet once; it includes
Passui's styles:

```css
@import "@passui/tanstack/styles.css";
```

Import an integration from its own entry point:

```tsx
import { useAppForm } from "@passui/tanstack/forms"
import { useAppMutation } from "@passui/tanstack/mutation"
import { ComposeViewport } from "@passui/tanstack/document"
```

The package exports TypeScript and TSX source. Your app's bundler must
process those files and its stylesheet through Tailwind CSS 4. Query
integrations use your app's QueryClientProvider.

## Publishing

From the Pherus checkout:

```bash
bun run typecheck
bun run test
bun run publish:check
bun publish
```

Publish the matching Passui version first. Bun resolves the local
`workspace:^` dependency to a public version range when packing. Login
with an npm account that can publish under `@passui`. Credentials stay in
your user npm configuration.

The Passui repository's `publish.yml` GitHub Actions workflow uses
the `npm-publish` environment and npm OIDC authentication. Its trusted
publisher must reference `phe-rus/passui`.

## License

MIT.
