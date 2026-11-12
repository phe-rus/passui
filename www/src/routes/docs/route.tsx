import { buttonVariants } from "@passui/react/button";
import { ContentUnavailableView } from "@passui/react/content-unavailable-view";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { DocsNav } from "@/components/docs/docs-nav";

export const Route = createFileRoute("/docs")({
	notFoundComponent: () => (
		<ContentUnavailableView
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
			<div className="sticky top-12 hidden h-[calc(100svh-3rem)] w-[261px] shrink-0 md:block">
				<aside
					data-docs-scroller
					className="no-scrollbar h-full overflow-y-auto"
				>
					<DocsNav />
				</aside>
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
