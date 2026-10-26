import { Link } from "@tanstack/react-router"
import { hasSolidComponent } from "@passui/solid/docs"

const updatedComponents = new Set([
    "toast",
    "tooltip",
    "popover",
    "sheet",
    "tab-bar",
])

/** Implementation options sit directly beneath the component description. */
export function ComponentFrameworkTabs({
    slug,
    framework,
}: {
    slug: string
    framework: "react" | "solid"
}) {
    const solidAvailable = hasSolidComponent(slug)
    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-separator/60">
            <Link
                to="/components/react/$slug"
                params={{ slug }}
                aria-current={
                    framework === "react" ? "page" : undefined
                }
                className={`border-b-2 px-0.5 py-3 text-callout font-semibold no-underline transition-colors ${framework === "react" ? "border-label text-label" : "border-transparent text-label-secondary hover:text-label"}`}
            >
                React
            </Link>
            {solidAvailable && (
                <Link
                    to="/components/solid/$slug"
                    params={{ slug }}
                    aria-current={
                        framework === "solid"
                            ? "page"
                            : undefined
                    }
                    className={`border-b-2 px-0.5 py-3 text-callout font-semibold no-underline transition-colors ${framework === "solid" ? "border-label text-label" : "border-transparent text-label-secondary hover:text-label"}`}
                >
                    SolidJS
                </Link>
            )}
            {updatedComponents.has(slug) && (
                <span
                    className="ms-auto rounded-full bg-accent-soft px-2.5 py-1 text-footnote font-semibold text-accent-text"
                    title="Component updated in October 2026"
                >
                    Updated
                </span>
            )}
        </div>
    )
}
