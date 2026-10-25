import { createComponent } from "solid-js"
import { hydrate } from "solid-js/web"
import { PlatformApp } from "./platform-app"

const root = document.getElementById("app")
if (!root) throw new Error("Missing platform fixture root")
hydrate(() => createComponent(PlatformApp, {}), root, {
    renderId: "platform-test",
})
