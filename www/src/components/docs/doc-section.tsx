import { Separator } from "@passui/react/separator";
import type { ReactNode } from "react";

interface DocSectionProps {
	/** Anchor for the outline and for links into the page. */
	id: string;
	title: ReactNode;
	/** One line under the title, with no gap. */
	description?: ReactNode;
	/** Leave out the rule above, for the first section of a page. */
	first?: boolean;
	children: ReactNode;
}

/**
 * One section of a docs page: a rule, a heading with its line, and the content
 * with an even rhythm. The outline watches `id`, so every part of a page is
 * reachable and the reader always knows which part they are in.
 */
export function DocSection({
	id,
	title,
	description,
	first,
	children,
}: DocSectionProps) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className="not-typeset flex scroll-mt-24 flex-col gap-5"
		>
			{first ? null : <Separator className="bg-separator/60 mb-5" />}
			<header className="flex flex-col gap-0">
				<h2
					id={`${id}-title`}
					className="text-title3 text-label m-0 font-medium"
				>
					{title}
				</h2>
				{description ? (
					<p className="text-subheadline text-label-secondary m-0">
						{description}
					</p>
				) : null}
			</header>
			{children}
		</section>
	);
}
