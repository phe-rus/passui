/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { AmbientUsage } from "../../src/components/ambient/examples/ambient-usage"
import { AmbientImages } from "../../src/components/ambient/examples/ambient-images"
import { AmbientNowPlaying } from "../../src/components/ambient/examples/ambient-now-playing"

test("Ambient previews render meaningful native Solid content", () => {
    for (const Example of [AmbientUsage, AmbientImages, AmbientNowPlaying]) {
        const html = renderToString(() => <Example />)
        expect(html).toContain("src=")
        expect(html).toContain("<section")
        expect(html).toContain("<img")
    }
})
