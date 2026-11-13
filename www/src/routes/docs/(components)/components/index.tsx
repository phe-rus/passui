import { cn } from "@passui/react/cn";
import { Layout } from "@passui/react/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { statusDot } from "@/components/docs/docs-nav";
import { groups, registry } from "@/features/catalog/registry";
import { pageColumn, pageGrid, prose } from "@/features/docs/lib/prose";
import { getPageHead } from "@/features/seo/lib/seo";

export const Route = createFileRoute("/docs/(components)/components/")({
	head: () =>
		getPageHead(
			"/docs/components",
			"Components · Passui",
			"Every Passui control by what it does, with live examples, source, props and accessibility notes.",
		),
	component: RouteComponent,
});

/** The overview: every component, grouped by what it does, names only, in the same column as every page. */
function RouteComponent() {
	return (
		<div className={pageGrid}>
			<Layout
				className={`${prose} ${pageColumn}`}
				heading={
					<Layout.Heading
						title="Components"
						description="Every control, grouped by what it does. Each page has live examples, source, props and accessibility notes."
					/>
				}
			>
				{groups.map((group) => {
					const items = registry.filter(
						(component) => component.group === group,
					);
					if (items.length === 0) return null;
					return (
						<section
							key={group}
							aria-labelledby={`group-${group}`}
							className="typeset"
						>
							<h2 id={`group-${group}`}>
								{group}{" "}
								<span className="text-label-tertiary text-footnote font-normal tabular-nums">
									{items.length}
								</span>
							</h2>
							<ul className="not-typeset m-0 mt-3 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
								{items.map((component) => {
									const status = component.preview
										? "preview"
										: component.status;
									return (
										<li key={component.slug}>
											<Link
												to="/docs/components/$slug"
												params={{ slug: component.slug }}
												className="bg-fill/40 text-subheadline text-label hover:bg-fill/70 focus-visible:ring-accent/70 flex min-h-11 items-center justify-between gap-2 rounded-2xl px-4 py-2 no-underline transition-colors outline-none focus-visible:ring-2"
											>
												{component.name}
												{status ? (
													<span
														role="img"
														aria-label={status}
														title={status}
														className={cn(
															"block size-1.5 shrink-0 rounded-full",
															statusDot[status],
														)}
													/>
												) : null}
											</Link>
										</li>
									);
								})}
							</ul>
						</section>
					);
				})}
			</Layout>
		</div>
	);
}
