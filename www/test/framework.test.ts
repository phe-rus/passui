import { expect, test } from "vitest"
import {
    frameworkPath,
    getFramework,
} from "@/domains/framework/framework"

test("React is the default and framework paths preserve the selected page", () => {
    expect(getFramework("/docs/installation")).toBe("react")
    expect(getFramework("/components/button")).toBe("react")
    expect(getFramework("/solid/docs/installation")).toBe(
        "solid"
    )
    expect(getFramework("/solidarity")).toBe("react")
    for (const path of [
        "/docs/installation",
        "/components",
        "/components/button",
    ]) {
        const solid = frameworkPath(path, "solid")
        expect(solid).toBe(`/solid${path}`)
        expect(frameworkPath(solid, "react")).toBe(path)
        expect(frameworkPath(solid, "solid")).toBe(solid)
    }
    expect(frameworkPath("/", "solid")).toBe(
        "/solid/docs/introduction"
    )
})
