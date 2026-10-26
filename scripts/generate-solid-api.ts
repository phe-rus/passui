import {
    readdirSync,
    readFileSync,
    writeFileSync,
} from "node:fs"
import { resolve } from "node:path"
import { parse } from "@babel/parser"
import { solidComponentSlugs } from "../packages/solid/src/docs/manifest"

type Property = {
    name: string
    type: string
    required: boolean
}
type SyntaxNode = {
    type: string
    members?: SyntaxNode[]
    types?: SyntaxNode[]
    body?: { body: SyntaxNode[] }
    typeAnnotation?: SyntaxNode
    key?: { name?: string; value?: string }
    optional?: boolean
    start: number
    end: number
}

const root = resolve(
    import.meta.dirname,
    "../packages/solid/src/components"
)
const output = resolve(
    import.meta.dirname,
    "../www/domains/framework/solid-api.json"
)

function membersOf(
    node: SyntaxNode | undefined
): SyntaxNode[] {
    if (node?.type === "TSTypeLiteral")
        return node.members ?? []
    if (node?.type === "TSIntersectionType") {
        return (node.types ?? []).flatMap(membersOf)
    }
    return []
}

function propertiesOf(
    node: SyntaxNode,
    source: string
): Property[] {
    const members =
        node.type === "TSInterfaceDeclaration"
            ? (node.body?.body ?? [])
            : membersOf(node.typeAnnotation)

    return members.flatMap((member) => {
        if (
            member.type !== "TSPropertySignature" ||
            !member.typeAnnotation?.typeAnnotation
        )
            return []
        const name = member.key?.name ?? member.key?.value
        if (typeof name !== "string") return []
        return [
            {
                name,
                type: source
                    .slice(
                        member.typeAnnotation.typeAnnotation
                            .start,
                        member.typeAnnotation.typeAnnotation
                            .end
                    )
                    .replace(/\s+/g, " "),
                required: !member.optional,
            },
        ]
    })
}

const api = Object.fromEntries(
    solidComponentSlugs.map((slug) => {
        const directory = resolve(
            root,
            slug === "icon-button" ? "button" : slug
        )
        const files = readdirSync(directory)
            .filter(
                (name) =>
                    name.endsWith(".tsx") ||
                    name.endsWith(".ts")
            )
            .sort(
                (a, b) =>
                    Number(b.startsWith(slug)) -
                    Number(a.startsWith(slug))
            )
        const expected = `${slug
            .split("-")
            .map(
                (part) =>
                    part[0].toUpperCase() + part.slice(1)
            )
            .join("")}Props`
        let properties: Property[] = []

        for (const filename of files) {
            const sourcePath = resolve(directory, filename)
            const source = readFileSync(sourcePath, "utf8")
            const ast = parse(source, {
                sourceType: "module",
                plugins: ["typescript", "jsx"],
            })
            for (const statement of ast.program.body) {
                const node =
                    statement.type ===
                    "ExportNamedDeclaration"
                        ? statement.declaration
                        : statement
                if (!node) continue
                if (
                    (node.type === "TSInterfaceDeclaration" ||
                        node.type ===
                            "TSTypeAliasDeclaration") &&
                    node.id.name === expected
                ) {
                    properties = propertiesOf(
                        node as unknown as SyntaxNode,
                        source
                    )
                    break
                }
            }
            if (properties.length) break
        }
        return [slug, properties]
    })
)

writeFileSync(output, `${JSON.stringify(api, null, 4)}\n`)
console.log(
    `Generated Solid API reference for ${Object.values(api).filter((value) => value.length).length} components`
)
