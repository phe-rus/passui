import { createFileRoute } from "@tanstack/react-router";
import { ComponentIndex } from "@/components/docs/component-index";
import { getPageHead } from "@/features/seo/head";

export const Route = createFileRoute("/docs/components/")({
	head: () =>
		getPageHead(
			"/docs/components",
			"Components · Passui",
			"Every Passui control by what it does, with live examples, source, props and accessibility notes.",
		),
	component: ComponentIndex,
});
