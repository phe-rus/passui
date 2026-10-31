import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { DocSection } from "@/domains/catalog/views/doc-section"

test("collapsible documentation uses PassUI disclosure semantics, not browser details", () => {
    const markup = renderToStaticMarkup(
        <DocSection
            id="accessibility"
            title="Accessibility"
            collapsible
        >
            <p>Keyboard and touch guidance</p>
        </DocSection>
    )

    expect(markup).toContain('aria-expanded="false"')
    expect(markup).toContain(
        'aria-controls="accessibility-content"'
    )
    expect(markup).toContain('id="accessibility-title"')
    expect(markup).toContain("<svg")
    expect(markup).not.toContain("<details")
    expect(markup).not.toContain("<summary")
})

test("documentation descriptions follow their heading without extra typography overrides", () => {
    const markup = renderToStaticMarkup(
        <DocSection
            id="usage"
            title="Usage"
            description="A description"
        >
            <p>Example</p>
        </DocSection>
    )

    expect(markup).toContain('aria-labelledby="usage-title"')
    expect(markup).toContain("gap-2")
    expect(markup).toContain("gap-5")
    expect(markup).toContain("A description")
})
