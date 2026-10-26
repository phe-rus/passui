import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { solidComponentSlugs } from "../../src/docs/manifest"

const examples = import.meta.glob<
    Record<
        string,
        () => ReturnType<Parameters<typeof renderToString>[0]>
    >
>("../../src/components/**/examples/*-usage.tsx", {
    eager: true,
})

test.each(solidComponentSlugs)(
    "%s documents a real, server-renderable Solid example",
    (slug) => {
        const key = Object.keys(examples).find((path) =>
            path.endsWith(`/${slug}-usage.tsx`)
        )
        expect(key).toBeDefined()
        if (!key) throw new Error(`Missing ${slug} example`)
        const functions = Object.values(examples[key])
        expect(functions).toHaveLength(1)
        expect(renderToString(functions[0])).not.toBe("")
    }
)
