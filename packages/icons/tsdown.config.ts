import { readdirSync } from "node:fs";
import { defineConfig } from "tsdown";

// One entry per icon: `@passui/icons/home` loads only the Home icon.
const entry: Record<string, string> = {
	index: "src/index.ts",
	"create-icon": "src/create-icon.tsx",
};
for (const file of readdirSync("src/icons"))
	entry[file.replace(/\.tsx$/, "")] = `src/icons/${file}`;

export default defineConfig({
	entry,
	format: "esm",
	platform: "browser",
	unbundle: true,
	dts: true,
	clean: false,
	exports: {
		customExports: (exports) => ({
			...exports,
			"./styles.css": "./styles.css",
		}),
	},
});
