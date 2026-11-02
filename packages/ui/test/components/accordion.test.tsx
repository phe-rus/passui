import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import { Accordion } from "../../src/components/accordion/accordion"

test("accordion exposes a single expanded item and a labelled content region", () => {
    const markup = renderToStaticMarkup(
        <Accordion
            value="first"
            onValueChange={() => {}}
            items={[
                { value: "first", title: "First", content: <p>First details</p> },
                { value: "second", title: "Second", content: <p>Second details</p> },
            ]}
        />
    )

    expect(markup).toContain('aria-expanded="true"')
    expect(markup).toContain('aria-expanded="false"')
    expect(markup).toContain('aria-labelledby="')
    expect(markup).toContain("First details")
})

test("accordion with a null value starts collapsed", () => {
    const markup = renderToStaticMarkup(
        <Accordion
            value={null}
            onValueChange={() => {}}
            items={[{ value: "one", title: "One", content: <p>Details</p> }]}
        />
    )

    expect(markup).toContain('aria-expanded="false"')
})
