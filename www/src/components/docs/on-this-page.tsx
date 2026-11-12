/** Anchor links for the headings on the current page. */
export function OnThisPage({
	items,
}: {
	items: { id: string; title: string }[];
}) {
	return (
		<nav aria-label="On this page" className="flex flex-col gap-2">
			<h4 className="text-caption text-label-tertiary font-semibold tracking-wide uppercase">
				On this page
			</h4>
			<ul className="m-0 flex list-none flex-col gap-1.5 p-0">
				{items.map((item) => (
					<li key={item.id}>
						<a
							href={`#${item.id}`}
							className="text-footnote text-label-secondary hover:text-label no-underline"
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
