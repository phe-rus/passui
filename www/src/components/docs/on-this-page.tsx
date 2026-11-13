import { cn } from "@passui/react/cn";
import { Text } from "@passui/react/text";

export interface OutlineItem {
	id: string;
	title: string;
	/** 0 for a section, 1 for a part inside it. */
	depth?: number;
}

/**
 * The outline at the page's right edge. The part you are reading is marked
 * with the accent, so the reader always knows where they are in the page.
 */
export function OnThisPage({
	items,
	active,
}: {
	items: OutlineItem[];
	active?: string;
}) {
	return (
		<nav
			aria-label="On this page"
			className="sticky top-24 flex flex-col gap-3"
		>
			<Text as="span" size="footnote" weight="semibold">
				On this page
			</Text>
			<ul className="border-separator/70 m-0 flex list-none flex-col border-s p-0">
				{items.map((item) => (
					<li key={item.id}>
						<a
							href={`#${item.id}`}
							aria-current={item.id === active ? "location" : undefined}
							className={cn(
								"text-footnote -ms-px block truncate border-s-2 py-1 no-underline transition-colors",
								item.depth ? "ps-6" : "ps-3",
								item.id === active
									? "border-accent text-label font-semibold"
									: "text-label-secondary hover:text-label border-transparent",
							)}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
