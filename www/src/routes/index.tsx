import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/home/landing";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
	head: () =>
		getPageHead(
			"/",
			"Passui · Native controls for the web",
			"Native React controls on Zag.js with an Apple 2026 look. Import one component and pay only for it.",
		),
	component: Landing,
});
