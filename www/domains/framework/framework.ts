export type DocsFramework = "react" | "solid"

export const frameworkOptions = [
    { value: "react", label: "React" },
    { value: "solid", label: "SolidJS" },
] as const

export function getFramework(
    pathname: string
): DocsFramework {
    return pathname.startsWith("/components/solid/") ||
        pathname === "/solid" ||
        pathname.startsWith("/solid/")
        ? "solid"
        : "react"
}

export function frameworkPath(
    pathname: string,
    framework: DocsFramework
) {
    const path =
        pathname
            .replace(
                /^\/components\/(react|solid)(?=\/)/,
                "/components"
            )
            .replace(/^\/solid(?=\/|$)/, "") || "/"
    const docsPath =
        path.startsWith("/docs/") ||
        path.startsWith("/components")
            ? path
            : "/docs/introduction"
    if (docsPath.startsWith("/components/"))
        return `/components/${framework}/${docsPath.slice("/components/".length)}`
    if (docsPath === "/components") return docsPath
    return framework === "solid"
        ? `/solid${docsPath}`
        : docsPath
}
