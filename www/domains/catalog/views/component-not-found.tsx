import { buttonStyle } from "@passui/react/button"
import { Link } from "@tanstack/react-router"

/** Shown for a component slug the registry does not know. */
export function ComponentNotFound() {
    return (
        <div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 text-center">
            <span className="font-mono text-footnote font-semibold text-accent-text">
                404
            </span>
            <h1 className="font-brand text-title font-extrabold tracking-tight text-label">
                No component by that name
            </h1>
            <p className="max-w-sm text-callout text-label-secondary">
                It may not be documented yet. Start from
                Button instead.
            </p>
            <Link
                to="/components/$slug"
                params={{ slug: "button" }}
                className={buttonStyle({
                    variant: "secondary",
                })}
            >
                Go to Button
            </Link>
        </div>
    )
}
