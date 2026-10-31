import { parse } from "@babel/parser"
import { existsSync, globSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const output = resolve(root, "www/domains/catalog/react-api.generated.json")
const modules = new Map()
function load(path) {
    if (modules.has(path)) return modules.get(path)
    const source = readFileSync(path, "utf8")
    const ast = parse(source, { sourceType: "module", plugins: ["typescript", "jsx"] })
    const module = { path, source, symbols: new Map(), imports: new Map(), exports: new Set(), parts: new Map() }
    modules.set(path, module)
    for (const statement of ast.program.body) {
        const node = statement.declaration ?? statement
        const expression = statement.type === "ExpressionStatement" ? statement.expression : undefined
        if (expression?.type === "AssignmentExpression" && expression.left.type === "MemberExpression" && expression.left.object.type === "Identifier" && expression.right.type === "Identifier") {
            const owner = expression.left.object.name
            const parts = module.parts.get(owner) ?? []
            parts.push([`${owner}.${expression.left.property.name}`, expression.right.name])
            module.parts.set(owner, parts)
        }
        if (node.type === "ImportDeclaration" && node.source.value.startsWith(".")) {
            const base = resolve(dirname(path), node.source.value)
            const target = [base, `${base}.tsx`, `${base}.ts`, `${base}/index.ts`].find(existsSync)
            if (target) for (const specifier of node.specifiers) {
                if (specifier.type === "ImportSpecifier") module.imports.set(specifier.local.name, [target, specifier.imported.name])
            }
        }
        if (node.id?.name) module.symbols.set(node.id.name, node)
        if (node.type === "VariableDeclaration") for (const item of node.declarations) module.symbols.set(item.id.name, item)
        if (statement.type === "ExportNamedDeclaration") {
            if (node.type === "FunctionDeclaration") module.exports.add(node.id.name)
            if (node.type === "VariableDeclaration") for (const item of node.declarations) module.exports.add(item.id.name)
        }
    }
    return module
}
function symbol(module, name) {
    const node = module.symbols.get(name)
    if (node) return { module, node }
    const imported = module.imports.get(name)
    return imported ? symbol(load(imported[0]), imported[1]) : undefined
}
const text = (module, node) => module.source.slice(node.start, node.end).replace(/\s+/g, " ").trim()
function displayType(module, node) {
    if (node.type === "TSTypeReference" && node.typeName.type === "Identifier") {
        const found = symbol(module, node.typeName.name)
        const alias = found?.node.type === "TSTypeAliasDeclaration" ? found.node.typeAnnotation : undefined
        if (alias?.type === "TSUnionType" && alias.types.every((part) => part.type === "TSLiteralType")) return text(found.module, alias)
    }
    return text(module, node)
}
function comment(node) {
    return (node.leadingComments ?? []).map((item) => item.value).join("\n").split("\n").map((line) => line.replace(/^\s*\*?\s?/, "")).join(" ").replace(/@default\s+.*$/, "").trim()
}
function typeFields(module, node, seen = new Set()) {
    if (!node) return { props: [], native: [] }
    if (node.type === "TSTypeAnnotation") return typeFields(module, node.typeAnnotation, seen)
    if (node.type === "TSTypeAliasDeclaration") return typeFields(module, node.typeAnnotation, seen)
    if (node.type === "TSIntersectionType") {
        const parts = node.types.map((part) => typeFields(module, part, new Set(seen)))
        return { props: parts.flatMap((part) => part.props), native: parts.flatMap((part) => part.native) }
    }
    if (node.type === "TSInterfaceDeclaration") {
        const inherited = (node.extends ?? []).map((base) => {
            const found = symbol(module, base.expression.name)
            return found ? typeFields(found.module, found.node, new Set(seen)) : { props: [], native: [text(module, base)] }
        })
        const own = typeFields(module, node.body, seen)
        return { props: [...inherited.flatMap((part) => part.props), ...own.props], native: inherited.flatMap((part) => part.native) }
    }
    if (["TSTypeLiteral", "TSInterfaceBody"].includes(node.type)) {
        return { props: (node.members ?? node.body).filter((member) => member.type === "TSPropertySignature").map((member) => ({
            name: member.key.name ?? member.key.value,
            type: member.typeAnnotation ? displayType(module, member.typeAnnotation.typeAnnotation) : "unknown",
            required: !member.optional,
            description: comment(member),
            defaultValue: member.leadingComments?.map((item) => item.value).join(" ").match(/@default\s+([^\n*]+)/)?.[1]?.trim() ?? null,
        })), native: [] }
    }
    if (node.type === "TSTypeReference") {
        const name = node.typeName.name
        const args = node.typeParameters?.params ?? []
        if (["Omit", "Pick"].includes(name)) {
            const result = typeFields(module, args[0], new Set(seen))
            const keys = (args[1]?.types ?? [args[1]]).map((key) => key?.literal?.value)
            result.props = result.props.filter((prop) => name === "Pick" ? keys.includes(prop.name) : !keys.includes(prop.name))
            result.native = result.native.map((native) => `${name}<${native}, ${text(module, args[1])}>`)
            return result
        }
        if (["PropsWithChildren", "Partial", "Readonly"].includes(name)) {
            const result = typeFields(module, args[0], new Set(seen))
            if (name === "Partial") result.props = result.props.map((prop) => ({ ...prop, required: false }))
            if (name === "PropsWithChildren") result.props.push({ name: "children", type: "ReactNode", required: false, description: "", defaultValue: null })
            return result
        }
        const key = `${module.path}:${name}`
        if (seen.has(key)) return { props: [], native: [] }
        seen.add(key)
        const found = symbol(module, name)
        if (found) return typeFields(found.module, found.node, seen)
        return { props: [], native: [text(module, node)] }
    }
    return { props: [], native: [] }
}
function component(module, node) {
    let fn = node
    let props
    let ref
    if (node.type === "VariableDeclarator") {
        const init = node.init
        if (init?.type === "CallExpression" && init.callee.name === "forwardRef") {
            props = init.typeParameters?.params?.[1]
            ref = init.typeParameters?.params?.[0]
            fn = init.arguments[0]
        } else if (init?.type === "CallExpression" && init.callee.object?.name === "Object" && init.callee.property?.name === "assign") {
            fn = init.arguments[0]
            if (fn.type === "Identifier") {
                const found = symbol(module, fn.name)
                return found ? component(found.module, found.node) : { props: [], native: [] }
            }
        } else fn = init
    }
    if (fn?.type === "Identifier") {
        const found = symbol(module, fn.name)
        return found ? component(found.module, found.node) : { props: [], native: [] }
    }
    const parameter = fn?.params?.[0]
    const result = typeFields(module, props ?? parameter?.typeAnnotation)
    if (parameter?.type === "Identifier" && parameter.typeAnnotation && !result.props.length && !result.native.length) {
        for (const argument of fn.params) {
            const value = argument.type === "AssignmentPattern" ? argument.left : argument
            if (value.type !== "Identifier" || !value.typeAnnotation) continue
            result.props.push({ name: value.name, type: text(module, value.typeAnnotation.typeAnnotation), required: !value.optional && argument.type !== "AssignmentPattern", description: comment(node), defaultValue: argument.type === "AssignmentPattern" ? text(module, argument.right) : null })
        }
    }
    const defaults = new Map((parameter?.properties ?? []).filter((property) => property.value?.type === "AssignmentPattern").map((property) => [property.key.name, text(module, property.value.right)]))
    result.props = result.props.map((prop) => ({ ...prop, defaultValue: defaults.get(prop.name) ?? prop.defaultValue }))
    if (ref) result.props.push({ name: "ref", type: `Ref<${text(module, ref)}>`, required: false, description: "Reference to the native element.", defaultValue: null })
    return result
}
const result = {}
for (const path of [...globSync("packages/ui/src/components/*/*.docs.tsx", { cwd: root })].sort()) {
    const docs = load(resolve(root, path))
    const declaration = [...docs.symbols.values()].find((node) => node.init?.arguments?.[0]?.type === "ObjectExpression")
    if (!declaration) continue
    const properties = declaration.init.arguments[0].properties
    const slug = properties.find((property) => property.key.name === "slug")?.value.value
    const name = properties.find((property) => property.key.name === "name")?.value.value
    if (!slug || !name) continue
    let found = symbol(docs, name)
    if (!found) for (const file of globSync("*.{ts,tsx}", { cwd: dirname(docs.path) })) {
        if (file.includes(".docs.")) continue
        const candidate = load(resolve(dirname(docs.path), file))
        if (candidate.symbols.has(name)) { found = { module: candidate, node: candidate.symbols.get(name) }; break }
    }
    if (!found) throw new Error(`Cannot locate ${name} for ${slug}`)
    const reference = component(found.module, found.node)
    const parts = []
    const partSymbols = found.node.init?.type === "ObjectExpression" ? found.node.init.properties.map((property) => [name + "." + property.key.name, property.value.name]) : [...found.module.exports].filter((part) => part !== name && part.startsWith(name)).map((part) => [part, part])
    partSymbols.push(...(found.module.parts.get(name) ?? []))
    for (const [partName, binding] of new Map(partSymbols)) {
        const part = symbol(found.module, binding)
        if (!part) continue
        const info = component(part.module, part.node)
        if (info.props.length || info.native.length) parts.push({ name: partName, ...info })
    }
    if (slug === "toast") parts.push({ name: "ToastOptions", ...typeFields(found.module, symbol(found.module, "ToastOptions")?.node) })
    result[slug] = { source: relative(root, found.module.path), props: [...new Map(reference.props.map((prop) => [prop.name, prop])).values()], native: [...new Set(reference.native)], parts }
}
if (Object.keys(result).length < 35) throw new Error("API extraction missed component families")
if (process.argv.includes("--check")) {
    if (!existsSync(output) || JSON.stringify(JSON.parse(readFileSync(output, "utf8"))) !== JSON.stringify(result)) throw new Error("React API reference is stale. Run bun run docs:api")
} else writeFileSync(output, JSON.stringify(result, null, 4) + "\n")
console.log(`React API: ${Object.keys(result).length} families extracted from source`)
