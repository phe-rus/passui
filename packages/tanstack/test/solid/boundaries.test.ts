import { readFileSync, existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { expect, test } from "vitest"
import manifest from "../../package.json"

test("Solid exports resolve and their local import graph stays independent of React", () => {
    const root = resolve(import.meta.dirname, "../..")
    const visited = new Set<string>()
    function inspect(path: string) {
        if (visited.has(path)) return
        visited.add(path)
        const source = readFileSync(path, "utf8")
        for (const match of source.matchAll(
            /(?:from\s+|import\s*)["']([^"']+)["']/g
        )) {
            const specifier = match[1]
            expect(specifier).not.toMatch(
                /^(react(?:-dom)?(?:\/|$)|@passui\/react(?:\/|$)|@tanstack\/react-)/
            )
            if (!specifier.startsWith(".")) continue
            const target = resolve(dirname(path), specifier)
            const resolved = [
                target,
                `${target}.ts`,
                `${target}.tsx`,
                `${target}/index.ts`,
            ].find(
                (path) =>
                    existsSync(path) &&
                    /\.[cm]?[jt]sx?$/.test(path)
            )
            expect(resolved).toBeDefined()
            if (resolved) inspect(resolved)
        }
    }
    for (const [key, target] of Object.entries(
        manifest.exports
    ))
        if (
            key.startsWith("./solid/") &&
            !key.endsWith(".css")
        )
            inspect(resolve(root, target))
    for (const name of [
        "react",
        "react-dom",
        "@passui/react",
        "@tanstack/react-form",
        "@tanstack/solid-form",
        "solid-js",
    ])
        expect(
            manifest.peerDependenciesMeta[
                name as keyof typeof manifest.peerDependenciesMeta
            ].optional
        ).toBe(true)
    expect(visited.size).toBeGreaterThan(15)
})
