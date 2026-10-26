import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import manifest from "./package.json" with { type: "json" }

const entries = Object.fromEntries(
    Object.values(manifest.exports).flatMap((target) => {
        if (typeof target === "string") return []
        const name = target.browser
            .slice("./dist/client/".length)
            .replace(/\.js$/, "")
        const source = resolve(import.meta.dirname, name)
        return [
            [
                name,
                existsSync(`${source}.tsx`)
                    ? `${source}.tsx`
                    : `${source}.ts`,
            ],
        ]
    })
)

export default defineConfig(({ mode }) => ({
    plugins: [solid({ ssr: true, dev: false })],
    build: {
        minify: false,
        outDir:
            mode === "server" ? "dist/server" : "dist/client",
        ssr: mode === "server",
        lib: { entry: entries, formats: ["es"] },
        rolldownOptions: {
            external: [
                /^solid-js(?:\/|$)/,
                /^@passui\/solid(?:\/|$)/,
                "clsx",
                "tailwind-merge",
            ],
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
            },
        },
    },
}))
