# @passui/solid

Private, unpublished native SolidJS foundation for Passui. Stage 1 exposes
shared tokens, styles, class-name helpers, date helpers and shapes.
Stage 2 adds platform detection, a document bootstrap and a native Solid
platform provider. Controls are not implemented yet. In particular,
`@passui/solid/button` does not exist.

```ts
import { cn } from "@passui/solid/cn"
import { accents } from "@passui/solid/tokens"
```

```css
@import "@passui/solid/styles.css";
```

These imports currently work only inside a workspace consuming this local
package. There is no public npm installation command for Solid yet.

Requires SolidJS 1.9+ and Tailwind CSS 4. Shared tokens and styles come from
`@passui/tokens`; no React runtime is imported. The CLI currently supports
React starters only.

## Native platform appearance

The `@passui/solid/appearance` entry exports `PlatformScript`,
`PlatformProvider`, `usePlatform`, `detectPlatform`, `resolvePlatform`
and the `PlatformOS` type. Names, platform values and detection precedence
match the React package. `PlatformScript` accepts a CSP `nonce`.

Place `PlatformScript` in the document head before the styled body. It
sets the root `data-os` before paint. Wrap application content with
`PlatformProvider`. The provider reports `unknown` on the server and
during initial hydration, then detects the platform after mounting.
Valid root overrides (`ios`, `android`, `macos`, `windows`, `linux`,
`unknown`) take precedence over browser detection. iPad desktop mode is
detected from MacIntel with multiple touch points.

`usePlatform()` returns the current platform string. Read it inside a
reactive expression or `createMemo(usePlatform)` so Solid tracks updates.
Do not store its result once during component initialization.

This minimal example is also the compiled SSR and hydration fixture in
`test/fixtures/platform-app.ts`:

```ts
import { createComponent } from "solid-js"
import { Dynamic } from "solid-js/web"
import {
    PlatformProvider,
    usePlatform,
} from "@passui/solid/appearance"

export function PlatformApp() {
    return createComponent(PlatformProvider, {
        get children() {
            return createComponent(Dynamic<"output">, {
                component: "output",
                get children() {
                    return usePlatform()
                },
            })
        },
    })
}
```

ThemeProvider, useTheme, controls, Solid TanStack integration and Solid CLI
templates are planned, and are not exported by this package.

## Verification

From the repository root:

```bash
bun run --cwd packages/solid typecheck
bun run --cwd packages/solid test
bun build packages/solid/test/fixtures/platform-browser.ts --target=browser --outdir=/tmp/passui-solid-platform
bun packages/solid/test/fixtures/platform-ssr.ts /tmp/passui-solid-platform
python3 -m http.server 3005 --bind 127.0.0.1 --directory /tmp/passui-solid-platform
```

Open `http://localhost:3005/` and `http://localhost:3005/override.html`.
The server markup contains `unknown`. Hydration updates the same output
to the detected browser platform, or `ios` for the override page, without
hydration errors or duplicate output elements. The Codex browser verified
both paths on October 25, 2026.
