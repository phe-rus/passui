const sources = import.meta.glob<string>(
    "../../../packages/solid/src/components/**/examples/*.tsx",
    { query: "?raw", import: "default", eager: true }
)

export function getSolidExampleSource(
    slug: string,
    id: string
) {
    const suffix = `/examples/${slug}-${id}.tsx`
    const path = Object.keys(sources).find((key) =>
        key.endsWith(suffix)
    )
    return path ? sources[path].trimEnd() : ""
}
