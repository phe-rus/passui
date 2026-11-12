import { ChevronLeftIcon } from "@passui/icons/chevron-left";
import { ChevronRightIcon } from "@passui/icons/chevron-right";
import { Link } from "@tanstack/react-router";
import { getNeighbours } from "@/features/catalog/navigation";

const linkClass =
	"text-footnote text-label-secondary hover:bg-fill hover:text-label inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-medium no-underline transition-colors";

/** Previous and Next on one row: just the direction and its arrow. */
export function PageNav({ href }: { href: string }) {
	const { previous, next } = getNeighbours(href);
	return (
		<nav
			aria-label="Pager"
			className="not-typeset border-separator/60 flex items-center justify-between gap-2 border-t pt-4"
		>
			{previous ? (
				<Link to={previous.href} rel="prev" className={linkClass}>
					<ChevronLeftIcon size={14} />
					Previous
				</Link>
			) : (
				<span />
			)}
			{next ? (
				<Link to={next.href} rel="next" className={linkClass}>
					Next
					<ChevronRightIcon size={14} />
				</Link>
			) : null}
		</nav>
	);
}
