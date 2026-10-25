// The source text of every example file, read at build time. This is the
// one place the site reaches into the package's folders, and only for text
// to display; the examples themselves run through @passui/react/docs.
const sources = import.meta.glob<string>(
    "../../../packages/ui/src/components/*/examples/*.tsx",
    { query: "?raw", import: "default", eager: true }
)

/** The code shown for an example: the exact file that renders it. */
export function getExampleSource(
    slug: string,
    id: string
): string {
    const suffix = `/examples/${slug}-${id}.tsx`
    const path = Object.keys(sources).find((key) =>
        key.endsWith(suffix)
    )
    return path ? sources[path].trimEnd() : ""
}
