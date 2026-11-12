import { defineConfig, devices } from "@playwright/test";

/**
 * Touch tests for Drawer and Sheet (spec 0003, AC-6 and AC-7). Chromium runs as
 * a Pixel and WebKit as an iPhone, both with touch on.
 *
 *     bunx playwright install chromium webkit
 *     bun run --cwd packages/ui test:e2e
 */
export default defineConfig({
	testDir: "e2e",
	testMatch: "**/*.e2e.ts",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? "github" : "list",
	use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
	projects: [
		{ name: "chromium", use: { ...devices["Pixel 7"] } },
		{ name: "webkit", use: { ...devices["iPhone 14"] } },
	],
	webServer: {
		command: "bunx vite --config e2e/fixture/vite.config.ts",
		url: "http://127.0.0.1:4173",
		reuseExistingServer: !process.env.CI,
		timeout: 60_000,
	},
});
