import { ComponentNotFound } from "@/domains/catalog/views/component-not-found";
import { getNavigationEntry } from "@/domains/catalog/get-navigation";
import { componentSearchSchema } from "@/domains/settings";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

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
