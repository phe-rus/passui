// The source text of every website-owned example, loaded at build time.
const sources = import.meta.glob<string>("./definitions/*/examples/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
})

/** The code shown for an example: the exact file that renders it. */
export function getExampleSource(slug: string, id: string): string {
    const suffix = `/examples/${slug}-${id}.tsx`
    const path = Object.keys(sources).find((key) => key.endsWith(suffix))
    return path ? sources[path].trimEnd() : ""
}
