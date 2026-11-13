---

title: Theming
summary: Light and dark, accents, platform looks and the colour roles behind them.
section: sections
order: 3
---

## Light and dark

Passui follows the system theme. `ThemeProvider` sets both a `class` and `data-theme` on the root, remembers the person's choice, and switches without a flash because it runs a small script before the first paint.

```tsx
import { ThemeProvider, useTheme } from "@passui/react/appearance";

function App() {
	return (
		<ThemeProvider
			attribute={["class", "data-theme"]}
			defaultTheme="system"
			enableSystem
		>
			<Page />
		</ThemeProvider>
	);
}

function ThemeButton() {
	const { theme, setTheme } = useTheme();
	return (
		<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
			Toggle
		</button>
	);
}
```

Either attribute on any element gives that part of a screen its own appearance, whatever the app's. A recorder that is always dark is one `data-theme="dark"` on its container, and everything inside keeps using the same role names.

## Accents

The accent is one of seven colours, set with `data-accent` on the root or on any element. It colours selection, the current tab, focus rings and primary actions, and tints the window ground by a few percent. See [Accents](/docs/accents).

Components that mark a selection take a `tone`, so the same control can follow the accent or stay quiet: `Tabs` and `Pagination` are `neutral`, `accent` or `primary`.

## Colour roles

Use roles, never hex. A role is a name for a job, and each has a light and a dark value.

- Grounds: `background`, `sidebar`, `surface`, `paper`, `elevated`, `fill`, `separator`.
- Text: `label`, `label-secondary`, `label-tertiary`, `ink`.
- Accent: `accent`, `on-accent`, `accent-text`, `accent-soft`.
- Status: `success`, `warning`, `danger`, `highlight`, `heart`.
- Materials: `inverse` (primary buttons and floating toolbars) and the glass utilities `glass`, `glass-bar`, `glass-pane` and `glass-menu`.

```tsx
<div className="bg-elevated text-label ring-1 ring-separator">
	<p className="text-label-secondary">Quiet detail</p>
	<button className="bg-accent text-on-accent">Continue</button>
</div>;
```

Every pairing is checked for WCAG AA contrast in the tokens package, so a role on its intended ground is always legible.

## Platform looks

The variants `ios:`, `android:`, `macos:`, `windows:` and `linux:` apply where the root has `data-os`, set before the first paint, so there is no flash of another platform's look. Apple platforms get glass; Android keeps flush, solid bars.

```tsx
<nav className="glass android:bg-elevated android:shadow-none">…</nav>;
```

## Motion

Springs are tokens too: `spring-smooth` for most transitions, `spring-snappy` for small feedback and `spring-bouncy` for playful moments. Reduce Motion is honoured everywhere: panels fall back to a plain fade, and nothing is lost.
