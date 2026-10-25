import { describe, expect, test } from "vitest"
import type { RegisteredDocs } from "@passui/react/docs"
import { resolveProps } from "@/domains/catalog/resolve-props"
import { getSnippet } from "@/domains/playground/get-snippet"

// A small stand-in for a component's docs, so each rule is tested alone.
function docsWith(
    overrides: Partial<RegisteredDocs> = {}
): RegisteredDocs {
    return {
        slug: "widget",
        name: "Widget",
        importPath: "@passui/react/widget",
        controls: {
            label: {
                kind: "text",
                default: "Hello",
                required: true,
            },
            tone: {
                kind: "select",
                options: { plain: true, loud: true },
                default: "plain",
            },
            disabled: { kind: "boolean", default: false },
            hint: { kind: "text", default: "" },
        },
        examples: [],
        usage: () => null,
        showcase: () => null,
        render: () => null,
        ...overrides,
    }
}

const snippet = (
    docs: RegisteredDocs,
    raw: Record<string, unknown> = {}
) => getSnippet(docs, resolveProps(docs, raw))

describe("getSnippet", () => {
    test("wraps the element in an exported component", () => {
        const code = snippet(docsWith())
        expect(code).toContain(
            'import { Widget } from "@passui/react/widget"'
        )
        expect(code).toContain(
            "export function WidgetExample() {"
        )
        expect(code).toContain("return (<Widget")
    })

    test("leaves out props at their defaults", () => {
        const code = snippet(docsWith())
        expect(code).not.toContain("tone=")
        expect(code).not.toContain("disabled")
        expect(code).not.toContain("hint=")
    })

    test("always writes required props, even at their default", () => {
        expect(snippet(docsWith())).toContain('label="Hello"')
    })

    test("writes changed selects, true flags and false flags", () => {
        expect(
            snippet(docsWith(), { tone: "loud" })
        ).toContain('tone="loud"')
        expect(
            snippet(docsWith(), { disabled: true })
        ).toMatch(/<Widget[^>]* disabled/)
        const flagOn = docsWith({
            controls: {
                open: { kind: "boolean", default: true },
            },
        })
        expect(snippet(flagOn, { open: false })).toContain(
            "open={false}"
        )
    })

    test("escapes text JSX would misread", () => {
        expect(
            snippet(docsWith(), { label: 'Say "hi"' })
        ).toContain('label={"Say \\"hi\\""}')
        expect(
            snippet(docsWith(), { hint: "{x}" })
        ).toContain('hint={"{x}"}')
    })

    test("falls back to defaults for unknown values", () => {
        const code = snippet(docsWith(), {
            tone: "nonsense",
            disabled: "yes",
        })
        expect(code).not.toContain("tone=")
        expect(code).not.toContain("disabled")
    })

    test("children snippets add imports, setup, props and parts", () => {
        const docs = docsWith({
            childrenSnippet: () => ({
                imports: [
                    'import { useState } from "react"',
                    'import { WidgetPart } from "@passui/react/widget"',
                ],
                setup: ["const [on, setOn] = useState(true)"],
                omit: ["tone"],
                element: "Widget.Root",
                extraProps: { "aria-label": "Close" },
                expressionProps: { onChange: "setOn" },
                spreadProps: ["handlers"],
                children: "<WidgetPart />",
            }),
        })
        const code = snippet(docs, { tone: "loud" })
        expect(code).toContain(
            'import { Widget, WidgetPart } from "@passui/react/widget"'
        )
        expect(code).toContain(
            "const [on, setOn] = useState(true)"
        )
        expect(code).not.toContain("tone=")
        expect(code).toContain('aria-label="Close"')
        expect(code).toContain("onChange={setOn}")
        expect(code).toContain("{...handlers}")
        expect(code).toContain(
            '<Widget.Root label="Hello" aria-label="Close" onChange={setOn} {...handlers}><WidgetPart /></Widget.Root>'
        )
    })

    test("capitalizes the component name for function exports", () => {
        const docs = docsWith({ name: "toast" })
        expect(snippet(docs)).toContain(
            "export function ToastExample() {"
        )
    })
})
