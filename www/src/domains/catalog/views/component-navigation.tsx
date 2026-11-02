import { ChevronLeftIcon, ChevronRightIcon } from "@passui/react/icons"
import { Link } from "@tanstack/react-router"
import { getNeighbours } from "../get-catalog"
import { componentTitle } from "../navigation"

/** Continue through the same ordered catalog shown in the sidebar. */
export function ComponentNavigation({ slug }: { slug: string }) {
    const { previous, next } = getNeighbours(slug)
    return (
        <nav
            aria-label="More components"
            className="grid grid-cols-2 gap-4 border-t border-separator/60 pt-6"
        >
            {([previous, next] as const).map((entry, index) =>
                entry ? (
                    <Link
                        key={entry.docs.slug}
                        to="/components/react/$slug"
                        params={{ slug: entry.docs.slug }}
                        className="flex min-w-0 items-center gap-2 rounded-lg p-2 text-subheadline text-label-secondary no-underline hover:bg-fill hover:text-label last:col-start-2 last:justify-end"
                    >
                        {index === 0 && <ChevronLeftIcon size={16} className="shrink-0" />}
                        <span className="min-w-0">
                            <span className="block text-caption text-label-tertiary">
                                {index === 0 ? "Previous" : "Next"}
                            </span>
                            {componentTitle(entry)}
                        </span>
                        {index === 1 && <ChevronRightIcon size={16} className="shrink-0" />}
                    </Link>
                ) : (
                    <span key={index} />
                )
            )}
        </nav>
    )
}
