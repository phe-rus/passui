import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/features/layout/components/site-layout";

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
