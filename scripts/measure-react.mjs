import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const root = resolve(process.argv.slice(2).find((argument) => !argument.startsWith("--")) ?? ".")
const temporary = mkdtempSync(join(tmpdir(), "passui-size-"))
// Picker and the searchable/creatable ComboBox share one React-only surface.
const budgets = { Button: 12000, Stepper: 14000, Picker: 16000, CodeBlock: 11000, ComboBox: 16000 }
const cases = [
    ["Button", "button/button"],
    ["Stepper", "stepper/stepper"],
    ["Picker", "picker/picker"],
    ["CodeBlock", "code-block/code-block"],
    ["ComboBox", "combo-box/combo-box"],
]
try {
    for (const [name, component] of cases) {
        const file = join(temporary, `${name}.ts`)
        writeFileSync(file, `export { ${name} } from ${JSON.stringify(join(root, "packages/ui/src/components", `${component}.tsx`))}`)
        const result = await Bun.build({
            entrypoints: [file], target: "browser", minify: true,
            external: ["react", "react-dom", "react/jsx-runtime"],
        })
        if (!result.success) throw new AggregateError(result.logs, `Could not bundle ${name}`)
        const bytes = new Uint8Array(await result.outputs[0].arrayBuffer())
        const gzip = Bun.gzipSync(bytes).length
        if (process.argv.includes("--check") && gzip > budgets[name]) throw new Error(`${name} exceeds its gzip budget: ${gzip} > ${budgets[name]}`)
        console.log(`${name}: ${bytes.length} bytes minified; ${Bun.gzipSync(bytes).length} bytes gzip (React external, dependencies included)`)
    }
} finally { rmSync(temporary, { recursive: true, force: true }) }
