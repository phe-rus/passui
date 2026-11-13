import { buttonVariants } from "@passui/react/button";
import { Empty } from "@passui/react/empty";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { DocsLegend, DocsNav } from "@/components/docs/docs-nav";

export const Route = createFileRoute("/docs")({
	notFoundComponent: () => (
		<Empty
			title="Page not found"
			description="That page does not exist in the docs."
			actions={
				<Link to="/docs/components" className={buttonVariants()}>
					Browse components
				</Link>
			}
		/>
	),
	component: RouteComponent,
});

/**
 * The docs run edge to edge: the navigation rail on the left, pinned under the
 * header, and the page filling the rest. Phones open the same list in a sheet.
 */
function RouteComponent() {
	return (
		<div className="flex w-full flex-1">
			<div className="sticky top-12 hidden h-[calc(100svh-3rem)] w-[261px] shrink-0 md:flex md:flex-col">
				<aside
					data-docs-scroller
					className="no-scrollbar min-h-0 flex-1 overflow-y-auto mask-[linear-gradient(to_bottom,transparent,black_1rem,black_calc(100%-1.5rem),transparent)]"
				>
					<DocsNav />
				</aside>
				<DocsLegend />
				{/* A hairline that fades out at both ends instead of a hard border. */}
				<span
					aria-hidden
					className="via-separator pointer-events-none absolute inset-y-0 end-0 w-px bg-linear-to-b from-transparent to-transparent"
				/>
			</div>
			<div className="min-w-0 flex-1 px-6">
				<Outlet />
			</div>
		</div>
	);
}
