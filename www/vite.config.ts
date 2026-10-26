import { cloudflare } from "@cloudflare/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import babel from "@rolldown/plugin-babel"
import viteReact, {
    reactCompilerPreset,
} from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import path from "node:path"
import solid from "vite-plugin-solid"

const solidSources = /\/packages\/solid\//

export default defineConfig({
    server: {
        cors: false,
    },
    resolve: {
        dedupe: [
            "react",
            "react-dom",
            "solid-js",
            "@tanstack/react-query",
            "@tanstack/react-router",
            "@tanstack/react-start",
            "@tanstack/react-form",
        ],
        tsconfigPaths: true,
        alias: {
            "@": path.resolve(import.meta.dirname, "."),
        },
    },
    build: {
        target: "esnext",
        cssCodeSplit: true,
    },
    plugins: process.env.VITEST
        ? []
        : [
              cloudflare({
                  viteEnvironment: {
                      name: "ssr",
                  },
                  persistState: true,
              }),
              tailwindcss(),
              tanstackStart(),
              solid({ include: solidSources, ssr: true }),
              babel({
                  exclude: [/node_modules/, solidSources],
                  presets: [reactCompilerPreset()],
              }),
              viteReact({
                  exclude: [/node_modules/, solidSources],
              }),
          ],
})
