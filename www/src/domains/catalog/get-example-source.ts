// Load source separately from the executable demo; the registry never carries raw files.
const sources = import.meta.glob<string>("./definitions/**/examples/*.tsx", {
    query: "?raw",
    import: "default",
})
const byFile = new Map(
    Object.entries(sources).map(([path, load]) => [path.split("/examples/")[1], load])
)

/** The copyable code is the exact file that renders the example. */
export async function getExampleSource(slug: string, id: string): Promise<string> {
    return (await byFile.get(`${slug}-${id}.tsx`)?.())?.trimEnd() ?? ""
}
