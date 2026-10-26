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

test.each(["vite", "tanstack"] as const)(
    "Solid %s starter parses with no React runtime imports",
    (template) => {
        const files = starterFiles(
            "solid-demo",
            template,
            "solid"
        )
        const manifest = JSON.parse(files["package.json"])
        expect(
            manifest.dependencies["solid-js"]
        ).toBeDefined()
        expect(manifest.dependencies.react).toBeUndefined()
        expect(
            JSON.parse(files["tsconfig.json"]).compilerOptions
                .jsxImportSource
        ).toBe("solid-js")
        for (const [path, source] of Object.entries(files)) {
            if (!/\.tsx?$/.test(path)) continue
            expect(parseSync(path, source).errors).toEqual([])
            expect(source).not.toMatch(
                /@passui\/react|@tanstack\/react|react-dom/
            )
            for (const entry of parseSync(path, source).module
                .staticImports) {
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
    }
)
