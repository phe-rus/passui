import { ComponentNotFound } from "@/domains/catalog/views/component-not-found";
import { getNavigationEntry } from "@/domains/catalog/get-navigation";
import { PreviewPage } from "@/domains/preview/views/preview-page";
import { previewSearchSchema, settingsDefaults } from "@/domains/settings";
import {
	createFileRoute,
	notFound,
	stripSearchParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/preview/$slug")({
	validateSearch: previewSearchSchema,
	search: {
		middlewares: [
			stripSearchParams({
				...settingsDefaults,
				props: {},
				scene: "component",
				example: "",
			}),
		],
	},
	loaderDeps: ({ search }) => ({
		scene: search.scene,
		example: search.example,
	}),
	loader: ({ params, deps }) => {
		const entry = getNavigationEntry(params.slug);
		if (
			!entry ||
			(deps.scene === "example" && !entry.exampleIds.includes(deps.example))
		)
			throw notFound();
	},
	head: () => ({
		meta: [
			{ title: "Preview · Passui" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	notFoundComponent: ComponentNotFound,
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const { props, scene, example, ...settings } = Route.useSearch();
	return (
		<PreviewPage
			slug={slug}
			settings={settings}
			props={props}
			scene={scene}
			example={example}
		/>
	);
}
