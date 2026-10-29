/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { InlineDisclosure } from "../../src/components/inline-disclosure/inline-disclosure"

test("open disclosure renders content without a client-only measurement", () => {
    const html = renderToString(() => (
        <InlineDisclosure open>
            <p>Account details</p>
        </InlineDisclosure>
    ))
    expect(html).toContain("Account details")
    expect(html).toContain("height:auto")
})

test("closed disclosure is not exposed to assistive technology", () => {
    const html = renderToString(() => (
        <InlineDisclosure open={false}>
            <p>Hidden details</p>
        </InlineDisclosure>
    ))
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain("inert")
})
