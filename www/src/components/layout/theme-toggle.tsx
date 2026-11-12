import { MoonIcon } from "@passui/icons/moon";
import { SunIcon } from "@passui/icons/sun";
import { useTheme } from "@passui/react/appearance";
import { Button } from "@passui/react/button";

/**
 * Flips between light and dark. Both glyphs render and CSS shows one, so the
 * server and the first client render agree whatever the person's theme is.
 */
export function ThemeToggle() {
	const { theme, systemTheme, setTheme } = useTheme();
	const current = theme === "system" ? systemTheme : theme;
	return (
		<Button
			variant="ghost"
			size="icon-sm"
			aria-label="Toggle theme"
			onClick={() => setTheme(current === "dark" ? "light" : "dark")}
		>
			<SunIcon size={18} className="dark:hidden" />
			<MoonIcon size={18} className="hidden dark:block" />
		</Button>
	);
}
