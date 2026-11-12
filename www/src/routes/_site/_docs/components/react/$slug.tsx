import {
	createFileRoute,
	notFound,
	stripSearchParams,
} from "@tanstack/react-router";
import { ComponentNotFound } from "@/features/catalog/components/component-not-found";
import { ComponentPage } from "@/features/catalog/components/component-page";
import { getNavigationEntry } from "@/features/catalog/lib/get-navigation";
import { getPageHead } from "@/features/seo/lib/get-page-head";
import { componentSearchSchema } from "@/features/settings";

export const Route = createFileRoute("/_site/_docs/components/react/$slug")({
	validateSearch: componentSearchSchema,
	search: {
		middlewares: [stripSearchParams({ props: {} })],
	},
	loader: ({ params }) => {
		if (!getNavigationEntry(params.slug)) throw notFound();
	},
	head: ({ params }) =>
		getPageHead(
			`/components/react/${params.slug}`,
			`${getNavigationEntry(params.slug)?.docs.name ?? "Not found"} · React · Passui`,
			getNavigationEntry(params.slug)?.content.summary ?? "",
		),
	notFoundComponent: ComponentNotFound,
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const { props, ...settings } = Route.useSearch();
	return (
		<ComponentPage
			key={slug}
			slug={slug}
			settings={settings}
			rawProps={props}
		/>
	);
}
