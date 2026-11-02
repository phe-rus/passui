import { useEffect, useState } from "react"

type Format = (code: string) => Promise<string>

let formatter: Promise<Format> | undefined

/**
 * Prettier with the repository's own style (the settings Biome uses in
 * `biome.json`), loaded on first use: only the TypeScript parser, which
 * reads TSX.
 */
function loadFormatter() {
    formatter ??= Promise.all([
        import("prettier/standalone"),
        import("prettier/plugins/typescript"),
        import("prettier/plugins/estree"),
    ]).then(
        ([prettier, typescript, estree]) =>
            (code: string) =>
                prettier.format(code, {
                    parser: "typescript",
                    plugins: [typescript, estree],
                    tabWidth: 4,
                    printWidth: 62,
                    semi: false,
                    trailingComma: "es5",
                })
    )
    return formatter
}

/**
 * The code laid out as an editor would, or the code as it came until the
 * formatter loads. Code that fails to parse is shown as it came.
 */
export function useFormattedCode(code: string): string {
    const [formatted, setFormatted] = useState({
        from: code,
        to: code,
    })

    useEffect(() => {
        let current = true
        loadFormatter()
            .then((format) => format(code))
            .then((to) => {
                if (current) setFormatted({ from: code, to })
            })
            .catch(() => {})
        return () => {
            current = false
        }
    }, [code])

    return formatted.from === code ? formatted.to : code
}
