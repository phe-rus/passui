/**
 * A JSX attribute for a string, quoted so the code always parses: a
 * plain `name="value"`, or `name={"value"}` when the value holds a quote,
 * a brace, a backslash or a line break.
 */
export function jsxAttribute(name: string, value: string) {
    return /["\\{}\n]/.test(value) ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`
}

/** Text as JSX children, wrapped in braces when JSX would misread it. */
export function jsxText(text: string) {
    return /[{}<>]/.test(text) ? `{${JSON.stringify(text)}}` : text
}
