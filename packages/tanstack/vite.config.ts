import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
export default defineConfig({
    resolve: { conditions: ["solid", "module", "node"] },
    ssr: {
        noExternal: [/@tanstack\/solid-/],
        resolve: { conditions: ["solid", "module", "node"] },
    },
    plugins: [
        solid({
            include: [
                /\/src\/solid\//,
                /\/test\/solid\//,
                /\/packages\/solid\//,
                /@tanstack\/solid-[^/]+\/dist\/source\//,
            ],
            ssr: true,
            dev: false,
        }),
    ],
})
