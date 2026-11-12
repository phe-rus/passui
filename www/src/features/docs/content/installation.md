---

title: Installation
summary: Set up any React app with the Passui CLI, create a starter, or install manually.
section: sections
order: 2
---

## Install

For guided setup, run the Passui CLI in your app. It generates a stylesheet and providers for your framework.

```bash
bunx @passui/cli@latest init

# Create a new project
bunx @passui/cli@latest create my-app --template vite
bunx @passui/cli@latest create my-app --template tanstack
```

Prefer to do it by hand? Add the packages and configure Tailwind CSS 4.

```bash
bun add @passui/react @passui/icons
```

With TanStack:

```bash
bun add @passui/tanstack @tanstack/react-query
```

## Styles

One import brings in Tailwind, the theme and everything the controls need. The stylesheet is the whole of your CSS: two lines, and nothing of your own to maintain.

```css
@import "@passui/react/globals.css";
@source "**/**/**.{ts,tsx}";
```

## Root setup

`PlatformScript` sets `data-os` before the first paint. Mount `Toaster` once if you use toasts.

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

```tsx
import { Button } from "@passui/react/button";

export function Save() {
	return <Button>Save</Button>;
}
```
