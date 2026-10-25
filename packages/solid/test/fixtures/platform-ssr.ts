import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { createComponent } from "solid-js"
import {
    generateHydrationScript,
    renderToString,
} from "solid-js/web"
import { PlatformScript } from "../../src/appearance"
import { PlatformApp } from "./platform-app"

const destination = process.argv[2]
if (!destination)
    throw new Error("Provide a fixture output directory")
mkdirSync(destination, { recursive: true })

const bootstrap = renderToString(
    () => createComponent(PlatformScript, {}),
    { renderId: "bootstrap-test" }
)
const app = renderToString(
    () => createComponent(PlatformApp, {}),
    { renderId: "platform-test" }
)

for (const override of [false, true]) {
    const html = `<!doctype html><html lang="en"${override ? ' data-os="ios"' : ""}><head><meta charset="utf-8"><title>Solid platform hydration</title>${bootstrap}${generateHydrationScript()}</head><body><h1>Solid platform hydration</h1><div id="app">${app}</div><script type="module" src="/platform-browser.js"></script></body></html>`
    writeFileSync(
        join(
            destination,
            override ? "override.html" : "index.html"
        ),
        html
    )
}
