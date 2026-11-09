import { cloudflare } from "@cloudflare/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import babel from "@rolldown/plugin-babel"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
    // ── Dev server ──────────────────────────────────────────────
    server: {
        cors: false,
    },

    // ── Module resolution ───────────────────────────────────────
    resolve: {
        // tsconfigPaths handles the @/ alias from tsconfig.json — no
        // manual alias needed.
        tsconfigPaths: true,
        // Single copies of these libraries across the workspace.
        dedupe: [
            "react",
            "react-dom",
            "@tanstack/react-query",
            "@tanstack/react-router",
            "@tanstack/react-start",
            "@tanstack/react-form",
        ],
    },

    // ── Build ───────────────────────────────────────────────────
    build: {
        target: "esnext",
        cssCodeSplit: true,
    },

    // ── Plugins ─────────────────────────────────────────────────
    // Skip all plugins during vitest (tests use their own transform).
    plugins: process.env.VITEST
        ? []
        : [
              // Cloudflare Workers adapter (SSR environment).
              cloudflare({
                  viteEnvironment: { name: "ssr" },
                  persistState: true,
              }),
              // Tailwind v4 — scans @passui packages via @source directives.
              tailwindcss(),
              // TanStack Start — route generation, SSR, server functions.
              tanstackStart(),
              // React Compiler (babel preset) — automatic memoization.
              babel({
                  exclude: [/node_modules/],
                  presets: [reactCompilerPreset()],
              }),
              // React Fast Refresh + JSX transform.
              viteReact({
                  exclude: [/node_modules/],
              }),
          ],
})
