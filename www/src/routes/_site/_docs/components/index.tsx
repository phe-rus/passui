import { getPageHead } from "@/features/seo/lib/get-page-head";
import { ComponentsOverview } from "@/features/catalog/components/components-overview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/_docs/components/")({
	head: () =>
		getPageHead(
			"/components",
			"Components · Passui",
			"Every Passui control, grouped by what it does, each with a live playground.",
		),
	component: RouteComponent,
});

function RouteComponent() {
	return <ComponentsOverview />;
}
