/**
 * Head tags every Passui document needs. Spread them into the root route's
 * `head().meta`:
 *
 *     meta: [{ charSet: "utf-8" }, viewportMeta, ...themeColorMeta({ light, dark })]
 */

/** `viewport-fit=cover` lets `env(safe-area-inset-*)` report the notch and home bar. */
export const viewportMeta = {
	name: "viewport",
	content: "width=device-width, initial-scale=1, viewport-fit=cover",
} as const;

/** Tints the browser chrome on Android. iOS Safari reads the page background instead. */
export function themeColorMeta(colors: { light: string; dark: string }) {
	return [
		{
			name: "theme-color",
			content: colors.light,
			media: "(prefers-color-scheme: light)",
		},
		{
			name: "theme-color",
			content: colors.dark,
			media: "(prefers-color-scheme: dark)",
		},
	] as const;
}
