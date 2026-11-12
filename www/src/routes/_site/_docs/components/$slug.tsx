import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { ComponentNotFound } from "@/features/catalog/components/component-not-found";
import { getNavigationEntry } from "@/features/catalog/lib/get-navigation";
import { componentSearchSchema } from "@/features/settings";

export const Route = createFileRoute("/_site/_docs/components/$slug")({
	validateSearch: componentSearchSchema,
	beforeLoad: ({ params, search, location }) => {
		if (!getNavigationEntry(params.slug)) throw notFound();
		throw redirect({
			to: "/components/react/$slug",
			params: { slug: params.slug },
			search,
			hash: location.hash,
			replace: true,
		});
	},
	notFoundComponent: ComponentNotFound,
});
