import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Serves the overlay fixture the Playwright tests drive. Run by playwright.config.ts.
export default defineConfig({
	root: import.meta.dirname,
	plugins: [tailwindcss()],
	resolve: { dedupe: ["react", "react-dom"] },
	server: { host: "127.0.0.1", port: 4173, strictPort: true },
});
