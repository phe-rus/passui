import { cloudflare } from "@cloudflare/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import babel from "@rolldown/plugin-babel"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
    server: {
        host: '0.0.0.0',
        cors: false,
    },
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
    build: {
        target: "esnext",
        cssCodeSplit: true,
    },
    plugins: process.env.VITEST
        ? []
        : [
              cloudflare({
                  viteEnvironment: { name: "ssr" },
                  persistState: true,
              }),
              tailwindcss(),
              tanstackStart(),
              babel({
                  exclude: [/node_modules/],
                  presets: [reactCompilerPreset()]
              }),
              viteReact({
                  exclude: [/node_modules/]
              })
          ]
})
