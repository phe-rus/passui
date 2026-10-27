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
    expect(getFramework("/components/solid/button")).toBe("solid")
    expect(getFramework("/components/react/button")).toBe("react")
    expect(frameworkPath("/components", "solid")).toBe("/components")
    expect(frameworkPath("/components", "react")).toBe("/components")
    expect(frameworkPath("/docs/installation", "solid")).toBe(
        "/solid/docs/installation"
    )
    expect(frameworkPath("/solid/docs/installation", "react")).toBe(
        "/docs/installation"
    )
    expect(frameworkPath("/components/button", "solid")).toBe(
        "/components/solid/button"
    )
    expect(frameworkPath("/components/solid/button", "react")).toBe(
        "/components/react/button"
    )
    expect(frameworkPath("/components/solid/button", "solid")).toBe(
        "/components/solid/button"
    )
    expect(frameworkPath("/", "solid")).toBe(
        "/solid/docs/introduction"
    )
})
