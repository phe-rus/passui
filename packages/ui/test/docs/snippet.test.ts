import { expect, test } from "vitest"
import { jsxAttribute, jsxText } from "../../src/docs/snippet"

test("plain attribute values are quoted", () => {
    expect(jsxAttribute("label", "Email")).toBe(
        'label="Email"'
    )
})

test("values JSX can't hold in quotes become expressions", () => {
    expect(jsxAttribute("label", 'Say "hi"')).toBe(
        'label={"Say \\"hi\\""}'
    )
    expect(jsxAttribute("label", "{braces}")).toBe(
        'label={"{braces}"}'
    )
    expect(jsxAttribute("label", "two\nlines")).toBe(
        'label={"two\\nlines"}'
    )
})

test("text that JSX would misread is wrapped", () => {
    expect(jsxText("Save")).toBe("Save")
    expect(jsxText("a < b")).toBe('{"a < b"}')
    expect(jsxText("{x}")).toBe('{"{x}"}')
})
