import { defineConfig } from "tsdown";

// Tokens ship compiled ESM and types. CSS files are published as they are.
export default defineConfig({
	entry: {
		index: "src/index.ts",
		accent: "src/accent.ts",
		color: "src/color.ts",
		layout: "src/layout.ts",
		motion: "src/motion.ts",
		"theme-css": "src/theme-css.ts",
		typography: "src/typography.ts",
	},
	format: "esm",
	platform: "neutral",
	dts: true,
	clean: true,
	exports: {
		customExports: (exports) => ({
			...exports,
			"./theme.css": "./theme.css",
			"./base.css": "./styles/base.css",
			"./utilities.css": "./styles/utilities.css",
			"./typeset.css": "./styles/typeset.css",
			"./styles.css": "./styles/styles.css",
		}),
	},
});
