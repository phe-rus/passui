import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@passui/react/card";
import { Layout } from "@passui/react/layout";
import { createFileRoute, Link } from "@tanstack/react-router";
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

/** The overview: every component, grouped by what it does, in the same column as every page. */
function RouteComponent() {
	return (
		<div className={pageGrid}>
			<Layout
				className={`${prose} ${pageColumn}`}
				heading={
					<Layout.Heading
						title="Components"
						description="Every control, by what it does. Each page has live examples, the exact source, props and accessibility notes."
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
							<h2 id={`group-${group}`}>{group}</h2>
							<ul className="not-typeset m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-2">
								{items.map((component) => (
									<li key={component.slug}>
										<Link
											to="/docs/components/$slug"
											params={{ slug: component.slug }}
											className="block h-full no-underline"
										>
											<Card className="h-full">
												<CardHeader>
													<CardTitle>{component.name}</CardTitle>
													<CardDescription>{component.summary}</CardDescription>
												</CardHeader>
											</Card>
										</Link>
									</li>
								))}
							</ul>
						</section>
					);
				})}
			</Layout>
		</div>
	);
}
