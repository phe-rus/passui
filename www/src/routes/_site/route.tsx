import { SiteLayout } from "@/domains/shell";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SiteLayout>
			<Outlet />
		</SiteLayout>
	);
}
