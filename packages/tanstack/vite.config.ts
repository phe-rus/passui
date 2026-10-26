import { resolve } from "node:path"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

const folders = [
    "forms",
    "form-fields",
    "tables",
    "document",
    "auth-shell",
    "settings",
    "mutation",
    "route-boundary",
]
const entries = Object.fromEntries(
    folders.map((folder) => [
        `src/solid/${folder}/index`,
        resolve(
            import.meta.dirname,
            `src/solid/${folder}/index.ts`
        ),
    ])
)

export default defineConfig(({ mode }) => ({
    resolve: { conditions: ["solid", "module", "node"] },
    ssr: {
        resolve: { conditions: ["solid", "module", "node"] },
    },
    plugins: [
        solid({
            include: [
                /\/src\/solid\//,
                /\/test\/solid\//,
                /@tanstack\/solid-[^/]+\/dist\/source\//,
            ],
            ssr: true,
            dev: false,
        }),
    ],
    build: {
        minify: false,
        outDir:
            mode === "server" ? "dist/server" : "dist/client",
        ssr: mode === "server",
        lib: { entry: entries, formats: ["es"] },
        rolldownOptions: {
            external: [
                /^@passui\/(?:solid|react|tanstack)(?:\/|$)/,
                /^@tanstack\//,
                /^solid-js(?:\/|$)/,
                /^react(?:\/|$)/,
                "clsx",
            ],
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
            },
        },
    },
}))
