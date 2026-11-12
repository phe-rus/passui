import { createFileRoute } from "@tanstack/react-router";
import { FeatureGrid } from "@/components/home/feature-grid";
import { Hero } from "@/components/home/hero";
import { getPageHead } from "@/features/seo/head";

export const Route = createFileRoute("/")({
	head: () =>
		getPageHead(
			"/",
			"Passui · Native React controls",
			"Native React controls on Zag.js with an Apple 2026 look. Import one component and pay only for it.",
		),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Hero />
			<FeatureGrid />
		</>
	);
}
