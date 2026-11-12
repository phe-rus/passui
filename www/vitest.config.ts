import contentCollections from "@content-collections/vite";
import { defineConfig } from "vitest/config";

/** Tests run on the app's own code, without the Cloudflare and TanStack Start plugins. */
export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [contentCollections()],
});
