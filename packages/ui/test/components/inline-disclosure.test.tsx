import { describe, expect, test } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"
import { InlineDisclosure } from "../../src/components/inline-disclosure/inline-disclosure"

describe("InlineDisclosure", () => {
    test("renders expanded content within the document flow", () => {
        const html = renderToStaticMarkup(
            <InlineDisclosure open>
                <p>Profile fields</p>
            </InlineDisclosure>
        )
        expect(html).toContain("Profile fields")
    })

    test("does not render collapsed content", () => {
        const html = renderToStaticMarkup(
            <InlineDisclosure open={false}>
                <p>Private details</p>
            </InlineDisclosure>
        )
        expect(html).not.toContain("Private details")
    })
})
