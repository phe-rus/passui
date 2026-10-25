import { useEffect, useState } from "react"
import type { HighlighterCore } from "shiki/core"

let highlighter: Promise<HighlighterCore> | undefined

/** The languages the site shows code in. */
export type CodeLang =
    | "tsx"
    | "css"
    | "json"
    | "shellscript"
    | "markdown"

/**
 * One small highlighter for the whole site, loaded on first use: five
 * languages, two themes, and the JavaScript regex engine (no WASM
 * download).
 */
function loadHighlighter() {
    highlighter ??= Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
    ]).then(([core, engine]) =>
        core.createHighlighterCore({
            langs: [
                import("shiki/langs/tsx.mjs"),
                import("shiki/langs/css.mjs"),
                import("shiki/langs/json.mjs"),
                import("shiki/langs/shellscript.mjs"),
                import("shiki/langs/markdown.mjs"),
            ],
            themes: [
                import(
                    "shiki/themes/github-light-default.mjs"
                ),
                import(
                    "shiki/themes/github-dark-default.mjs"
                ),
            ],
            engine: engine.createJavaScriptRegexEngine(),
        })
    )
    return highlighter
}

/**
 * Highlighted HTML for some code, or null until the highlighter loads;
 * colours are CSS variables that follow the site's light or dark.
 */
export function useHighlight(
    code: string,
    lang: CodeLang = "tsx"
): string | null {
    const [html, setHtml] = useState<string | null>(null)

    useEffect(() => {
        let current = true
        loadHighlighter().then((instance) => {
            if (!current) return
            setHtml(
                instance.codeToHtml(code, {
                    lang,
                    themes: {
                        light: "github-light-default",
                        dark: "github-dark-default",
                    },
                    defaultColor: false,
                })
            )
        })
        return () => {
            current = false
        }
    }, [code, lang])

    return html
}
