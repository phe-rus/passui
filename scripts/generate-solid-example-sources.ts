import { readdirSync, writeFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"

const root = resolve(
    import.meta.dir,
    "../packages/solid/src/components"
)
const target = resolve(
    import.meta.dir,
    "../www/domains/framework/solid-example-sources.generated.ts"
)

function collect(directory: string): string[] {
    return readdirSync(directory, {
        withFileTypes: true,
    }).flatMap((entry) => {
        const path = join(directory, entry.name)
        return entry.isDirectory()
            ? collect(path)
            : entry.name.endsWith(".tsx") &&
                path.includes("/examples/")
              ? [path]
              : []
    })
}

const paths = collect(root).sort()
const imports: string[] = []
const entries: string[] = []
for (const [index, path] of paths.entries()) {
    const name = path
        .split("/")
        .at(-1)
        ?.replace(/\.tsx$/, "")
    if (!name) continue
    const slug = name.split("-").slice(0, -1).join("-")
    // The slug cannot be recovered by splitting at the last hyphen:
    // use the containing component directory, except icon-button (in button/).
    const component = path
        .split("/components/")[1]
        ?.split("/")[0]
    const id = name.startsWith(`${component}-`)
        ? name.slice(component.length + 1)
        : name.startsWith("icon-button-")
          ? name.slice("icon-button-".length)
          : ""
    const key =
        component === "button" &&
        name.startsWith("icon-button-")
            ? `icon-button/${id}`
            : `${component}/${id}`
    if (!id)
        throw new Error(
            `Unexpected Solid example filename: ${name} (${slug})`
        )
    const specifier = relative(
        resolve(target, ".."),
        path
    ).replaceAll("\\", "/")
    imports.push(
        `import source${index} from ${JSON.stringify(`${specifier.startsWith(".") ? "" : "./"}${specifier}?raw`)}`
    )
    entries.push(
        `    ${JSON.stringify(key)}: source${index},`
    )
}

writeFileSync(
    target,
    `// Generated with bun scripts/generate-solid-example-sources.ts. Do not edit by hand.\n${imports.join("\n")}\n\nexport const solidExampleSources: Record<string, string> = {\n${entries.join("\n")}\n}\n`
)
console.log(
    `Generated Solid source manifest for ${entries.length} examples.`
)
