import { ChevronLeftIcon } from "@passui/icons/chevron-left";
import { ChevronRightIcon } from "@passui/icons/chevron-right";
import { Link } from "@tanstack/react-router";
import { getNeighbours } from "@/features/catalog/navigation";

const linkClass =
	"hover:bg-fill/60 focus-visible:ring-accent/70 flex min-w-0 flex-col gap-0.5 rounded-2xl px-4 py-3 no-underline transition-colors outline-none focus-visible:ring-2";

/** Previous and Next, each with the page it goes to, so the reader knows where a click leads. */
export function PageNav({ href }: { href: string }) {
	const { previous, next } = getNeighbours(href);
	return (
		<nav
			aria-label="Pager"
			className="not-typeset border-separator/60 mt-2 grid grid-cols-2 gap-3 border-t pt-4"
		>
			{previous ? (
				<Link to={previous.href} rel="prev" className={linkClass}>
					<span className="text-caption text-label-tertiary flex items-center gap-1">
						<ChevronLeftIcon size={12} />
						Previous
					</span>
					<span className="text-subheadline text-label truncate font-medium">
						{previous.title}
					</span>
				</Link>
			) : (
				<span />
			)}
			{next ? (
				<Link
					to={next.href}
					rel="next"
					className={`${linkClass} items-end text-end`}
				>
					<span className="text-caption text-label-tertiary flex items-center gap-1">
						Next
						<ChevronRightIcon size={12} />
					</span>
					<span className="text-subheadline text-label max-w-full truncate font-medium">
						{next.title}
					</span>
				</Link>
			) : null}
		</nav>
	);
}
