import { solidExampleSources } from "./solid-example-sources.generated"

// Showcase scenes are optional native Solid examples. Discover them directly so
// the hero stays current even before the generated source manifest is refreshed.
const showcaseSources = import.meta.glob<string>(
    "../../../packages/solid/src/components/*/examples/*-showcase.tsx",
    { eager: true, query: "?raw", import: "default" }
)

/** Return copyable application code without the library's per-file JSX hint. */
export function getSolidExampleSource(
    slug: string,
    id: string
) {
    const showcase =
        id === "showcase"
            ? showcaseSources[
                  `../../../packages/solid/src/components/${slug === "icon-button" ? "button" : slug}/examples/${slug}-showcase.tsx`
              ]
            : undefined
    return (
        showcase ??
        solidExampleSources[`${slug}/${id}`] ??
        ""
    )
        .replace(
            /^\/\*\* @jsxImportSource solid-js \*\/\s*/,
            ""
        )
        .trimEnd()
}
