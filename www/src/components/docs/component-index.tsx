import { Link } from "@tanstack/react-router";
import { groups, registry } from "@/features/components/registry";

/** The overview at /docs/components: every component by family. */
export function ComponentIndex() {
	return (
		<div className="flex flex-col gap-10">
			<header className="flex flex-col gap-3">
				<h1 className="font-brand text-large-title font-extrabold tracking-tight">
					Components
				</h1>
				<p className="text-callout text-label-secondary max-w-2xl">
					Every control, by what it does. Each page has live examples, the exact
					source, props and accessibility notes.
				</p>
			</header>
			{groups.map((group) => {
				const items = registry.filter((c) => c.group === group);
				if (items.length === 0) return null;
				return (
					<section
						key={group}
						aria-labelledby={`group-${group}`}
						className="flex flex-col gap-3"
					>
						<h2 id={`group-${group}`} className="text-title3 font-semibold">
							{group}
						</h2>
						<ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
							{items.map((c) => (
								<li key={c.slug}>
									<Link
										to="/docs/components/$slug"
										params={{ slug: c.slug }}
										className="bg-elevated ring-separator hover:bg-fill/60 flex h-full flex-col gap-1 rounded-2xl p-4 no-underline ring-1 transition-colors"
									>
										<span className="text-headline text-label font-semibold">
											{c.name}
										</span>
										<span className="text-footnote text-label-secondary">
											{c.summary}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</section>
				);
			})}
		</div>
	);
}
