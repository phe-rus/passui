import { expect, test } from "vitest"
import { posix } from "node:path"
import { parseSync } from "oxc-parser"
import { starterFiles } from "../src/templates"

test.each(["vite", "tanstack"] as const)(
    "%s starter source parses and every relative module resolves",
    (template) => {
        const files = starterFiles("demo", template)
        for (const [path, source] of Object.entries(files)) {
            if (
                !path.endsWith(".tsx") &&
                !path.endsWith(".ts")
            )
                continue
            const parsed = parseSync(path, source)
            expect(parsed.errors).toEqual([])
            for (const entry of parsed.module.staticImports) {
                const specifier = entry.moduleRequest.value
                if (!specifier.startsWith(".")) continue
                const target = posix.normalize(
                    posix.join(
                        posix.dirname(path),
                        specifier.replace(/\?url$/, "")
                    )
                )
                if (target.endsWith("routeTree.gen")) continue
                expect(
                    files[target] ??
                        files[`${target}.ts`] ??
                        files[`${target}.tsx`]
                ).toBeDefined()
            }
        }
        if (template === "vite") {
            expect(
                JSON.parse(files["package.json"])
                    .dependencies["@passui/tanstack"]
            ).toBeUndefined()
        }
    }
)
