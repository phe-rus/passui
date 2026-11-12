import { buttonVariants } from "@passui/react/button";
import { Link } from "@tanstack/react-router";
import { getNeighbours } from "@/features/components/navigation";

export function PageNav({ href }: { href: string }) {
	const { previous, next } = getNeighbours(href);
	return (
		<nav
			aria-label="Pagination"
			className="border-separator flex items-center justify-between gap-3 border-t pt-6"
		>
			{previous ? (
				<Link
					to={previous.href}
					className={buttonVariants({ variant: "secondary" })}
				>
					← {previous.title}
				</Link>
			) : (
				<span />
			)}
			{next ? (
				<Link
					to={next.href}
					className={buttonVariants({ variant: "secondary" })}
				>
					{next.title} →
				</Link>
			) : null}
		</nav>
	);
}
