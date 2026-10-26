import { solidExampleSources } from "./solid-example-sources.generated"

/** Return copyable application code without the library's per-file JSX hint. */
export function getSolidExampleSource(
    slug: string,
    id: string
) {
    return (solidExampleSources[`${slug}/${id}`] ?? "")
        .replace(
            /^\/\*\* @jsxImportSource solid-js \*\/\s*/,
            ""
        )
        .trimEnd()
}
