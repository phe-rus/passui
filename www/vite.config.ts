import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		host: true,
		port: 3004,
		strictPort: true,
	},
	plugins: [
		contentCollections(),
		cloudflare({
			viteEnvironment: {
				name: "ssr",
			},
			persistState: true,
		}),
		tailwindcss(),
		tanstackStart(),
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
});
