---

title: Installation
summary: Set up any React app with the Passui CLI, create a starter, or install manually.
section: sections
order: 2
---

## Install

In an existing app, run the CLI. It adds a stylesheet and providers and leaves your own code alone.

```bash
bunx @passui/cli@latest init
```

Starting fresh? Create an app from a starter. Use `--template tanstack` for TanStack Start, or see the [templates](/templates).

```bash
bunx @passui/cli@latest create my-app --template vite
```

Prefer to do it by hand? Passui needs Tailwind CSS 4. Add the packages:

```bash
bun add @passui/react @passui/icons
```

With TanStack, also add `@passui/tanstack` and `@tanstack/react-query`.

## Styles

One import brings in Tailwind, the theme and everything the controls need. Tailwind finds Passui's files itself, so there are no paths to add. With TanStack, import `@passui/tanstack/styles.css` instead.

```css
@import "@passui/react/styles.css";
```

## Root setup

`PlatformScript` sets `data-os` before the first paint, so platform styles never flash. Mount `Toaster` once if you use toasts.

```tsx
import {
	PlatformProvider,
	PlatformScript,
	ThemeProvider,
} from "@passui/react/appearance";
import { Toaster } from "@passui/react/toast";

export function Root({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<PlatformScript />
			</head>
			<body>
				<PlatformProvider>
					<ThemeProvider
						attribute={["class", "data-theme"]}
						defaultTheme="system"
						enableColorScheme
						enableSystem
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</PlatformProvider>
			</body>
		</html>
	);
}
```

## Use a component

Every control is its own entry point, `@passui/react/<name>`. [Browse them all](/docs/components).

```tsx
import { Button } from "@passui/react/button";

export function Save() {
	return <Button>Save</Button>;
}
```
