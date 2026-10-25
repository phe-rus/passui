import { createComponent } from "solid-js"
import { Dynamic } from "solid-js/web"
import {
    PlatformProvider,
    usePlatform,
} from "../../src/appearance"

export function PlatformApp() {
    return createComponent(PlatformProvider, {
        get children() {
            return createComponent(Dynamic<"output">, {
                component: "output",
                id: "platform",
                get children() {
                    return usePlatform()
                },
            })
        },
    })
}
