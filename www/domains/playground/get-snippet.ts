import {
    jsxAttribute,
    jsxText,
    type RegisteredDocs,
} from "@passui/react/docs"
import {
    type ControlValue,
    getChangedProps,
    type PropValues,
} from "@/domains/catalog/resolve-props"

/** An attribute for a control value: a bare flag, false, or a string. */
function attribute(name: string, value: ControlValue) {
    if (value === true) return name
    if (value === false) return `${name}={false}`
    return jsxAttribute(name, value)
}

/**
 * Imports from the same module, merged into one line with sorted names:
 * a component's own import and the parts its snippet adds.
 */
function mergeImports(lines: string[]) {
    const named = new Map<string, Set<string>>()
    const other: string[] = []
    for (const line of lines) {
        const match = line.match(
            /^import \{ (.+) \} from "(.+)"$/
        )
        if (!match) {
            if (!other.includes(line)) other.push(line)
            continue
        }
        const names = named.get(match[2]) ?? new Set()
        for (const name of match[1].split(", "))
            names.add(name)
        named.set(match[2], names)
    }
    return [
        ...Array.from(
            named,
            ([from, names]) =>
                `import { ${[...names].sort().join(", ")} } from "${from}"`
        ),
        ...other,
    ]
}

/**
 * The code for the current control values, as a component ready to paste
 * into a file: the imports, then `export function <Name>Example()` with
 * any state it needs and the element, carrying the props that differ from
 * their defaults (AC-3) plus required props always, so it compiles. It
 * comes out unformatted; `useFormattedCode` lays it out.
 */
export function getSnippet(
    docs: RegisteredDocs,
    values: PropValues
): string {
    const required = Object.fromEntries(
        Object.entries(docs.controls).flatMap(
            ([name, control]) =>
                control?.kind === "text" &&
                control.required &&
                name in values
                    ? [[name, values[name]]]
                    : []
        )
    )
    const changed = {
        ...required,
        ...getChangedProps(docs, values),
    }
    const custom = docs.childrenSnippet?.(values)
    const label =
        typeof values.children === "string"
            ? values.children
            : ""
    const children = custom
        ? custom.children
        : label
          ? jsxText(label)
          : ""

    const attributes = [
        ...Object.entries(changed)
            .filter(
                ([name]) =>
                    name !== "children" &&
                    !custom?.omit?.includes(name)
            )
            .map(([name, value]) => attribute(name, value)),
        ...Object.entries(custom?.extraProps ?? {}).map(
            ([name, value]) => attribute(name, value)
        ),
        ...Object.entries(custom?.expressionProps ?? {}).map(
            ([name, expression]) => `${name}={${expression}}`
        ),
        ...(custom?.spreadProps ?? []).map(
            (name) => `{...${name}}`
        ),
    ]
    const tag = custom?.element ?? docs.name
    const opening = [tag, ...attributes].join(" ")
    const element = children
        ? `<${opening}>${children}</${tag}>`
        : `<${opening} />`

    const imports = mergeImports([
        `import { ${docs.name} } from "${docs.importPath}"`,
        ...(custom?.imports ?? []),
    ])
    const setup = custom?.setup ?? []
    const body = [
        // a component's name starts with a capital, even for `toast`
        `export function ${docs.name.charAt(0).toUpperCase()}${docs.name.slice(1)}Example() {`,
        ...setup,
        ...(setup.length ? [""] : []),
        `return (${element})`,
        "}",
    ]
    return `${imports.join("\n")}\n\n${body.join("\n")}\n`
}
