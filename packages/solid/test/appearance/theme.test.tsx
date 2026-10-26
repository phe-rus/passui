/** @jsxImportSource solid-js */
import { runInNewContext } from "node:vm"
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import {
    script,
    ThemeProvider,
    useTheme,
} from "../../src/appearance/theme"

test("theme context and bootstrap are SSR safe with one provider", () => {
    function ThemeValue() {
        return <span>{useTheme().theme}</span>
    }
    const html = renderToString(() => (
        <ThemeProvider nonce="theme-test">
            <ThemeProvider>
                <ThemeValue />
            </ThemeProvider>
        </ThemeProvider>
    ))
    expect(html.match(/<script/g)).toHaveLength(1)
    expect(html).toContain('nonce="theme-test"')
    expect(html).toContain("system")
})

test("bootstrap configuration cannot close its script element", () => {
    const html = renderToString(() => (
        <ThemeProvider
            storageKey={"</script><script>alert(1)</script>"}
        />
    ))
    expect(html.match(/<script/g)).toHaveLength(1)
    expect(html).toContain("\\u003c/script>")
})

test("bootstrap resolves stored, forced and system themes into classes and attributes", () => {
    for (const [stored, forced, dark, expected] of [
        ["system", undefined, true, "dark"],
        ["light", undefined, true, "light"],
        ["light", "dark", false, "dark"],
    ] as const) {
        const attributes = new Map<string, string>()
        const classes = new Set<string>()
        const style = { colorScheme: "" }
        const run = `(${script.toString()})(["class","data-theme"],"theme","system",${JSON.stringify(forced)},["light","dark"],undefined,true,true)`
        runInNewContext(run, {
            document: {
                documentElement: {
                    classList: {
                        remove: (...names: string[]) =>
                            names.forEach((name) => {
                                classes.delete(name)
                            }),
                        add: (name: string) =>
                            classes.add(name),
                    },
                    setAttribute: (
                        name: string,
                        value: string
                    ) => attributes.set(name, value),
                    removeAttribute: (name: string) =>
                        attributes.delete(name),
                    style,
                },
            },
            window: { matchMedia: () => ({ matches: dark }) },
            localStorage: { getItem: () => stored },
        })
        expect(attributes.get("data-theme")).toBe(expected)
        expect(classes.has(expected)).toBe(true)
        expect(style.colorScheme).toBe(expected)
    }
})
