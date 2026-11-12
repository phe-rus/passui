import { defineConfig } from "tsdown";

// Each integration is its own entry. Peers stay external, so a consumer pays
// only for the integrations it imports. `./react/*` keeps the older subpaths.
const integrations = [
	"forms",
	"form-fields",
	"tables",
	"document",
	"auth-shell",
	"settings",
	"mutation",
	"route-boundary",
];

export default defineConfig({
	entry: {
		...Object.fromEntries(
			integrations.map((name) => [name, `src/${name}/index.ts`]),
		),
		core: "src/shared/index.ts",
	},
	format: "esm",
	platform: "browser",
	unbundle: true,
	dts: true,
	clean: true,
	exports: {
		customExports: (exports) => ({
			...exports,
			...Object.fromEntries(
				integrations.map((name) => [`./react/${name}`, exports[`./${name}`]]),
			),
			"./styles.css": "./src/styles.css",
			"./react/styles.css": "./src/styles.css",
		}),
	},
});
