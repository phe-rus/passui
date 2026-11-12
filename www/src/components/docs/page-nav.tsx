import { Link } from "@tanstack/react-router";
import { getNeighbours } from "@/features/components/navigation";

/** Previous and next, as links: a page you walk to is a link, never a button. */
export function PageNav({ href }: { href: string }) {
	const { previous, next } = getNeighbours(href);
	const link =
		"group flex flex-col gap-0.5 rounded-2xl px-4 py-3 no-underline transition-colors duration-(--duration-fast) hover:bg-fill/70";
	return (
		<nav
			aria-label="Previous and next page"
			className="border-separator flex items-stretch justify-between gap-3 border-t pt-6"
		>
			{previous ? (
				<Link to={previous.href} className={link}>
					<span className="text-footnote text-label-secondary">Previous</span>
					<span className="text-subheadline text-label font-semibold">
						{previous.title}
					</span>
				</Link>
			) : (
				<span />
			)}
			{next ? (
				<Link to={next.href} className={`${link} text-end`}>
					<span className="text-footnote text-label-secondary">Next</span>
					<span className="text-subheadline text-label font-semibold">
						{next.title}
					</span>
				</Link>
			) : null}
		</nav>
	);
}
