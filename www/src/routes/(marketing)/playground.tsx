import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { ButtonPlayground } from "@/features/playground/button-playground";
import {
	defaultSearch,
	playgroundSearchSchema,
} from "@/features/playground/search";
import { getPageHead } from "@/features/seo/lib/seo";

export const Route = createFileRoute("/(marketing)/playground")({
	validateSearch: playgroundSearchSchema,
	search: { middlewares: [stripSearchParams(defaultSearch)] },
	head: () =>
		getPageHead(
			"/playground",
			"Button playground · Passui",
			"Change a Button's options and copy the code that matches.",
		),
	component: RouteComponent,
});

function RouteComponent() {
	return <ButtonPlayground />;
}
