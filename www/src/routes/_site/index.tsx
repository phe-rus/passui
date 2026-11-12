import { getPageHead } from "@/features/seo/lib/get-page-head";
import { Landing } from "@/features/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/")({
	head: () =>
		getPageHead(
			"/",
			"Passui · Native React controls",
			"Native React controls, design tokens and themes for any React framework. Explore live examples and set up your project with the Passui CLI.",
		),
	component: RouteComponent,
});

function RouteComponent() {
	return <Landing />;
}
