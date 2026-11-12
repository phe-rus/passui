import { createFileRoute, notFound } from "@tanstack/react-router";
import { ComponentNotFound } from "@/features/catalog/components/component-not-found";
import { GuidePage } from "@/features/docs/components/guide-page";
import { getGuide } from "@/features/docs/lib/get-guides";
import { getPageHead } from "@/features/seo/lib/get-page-head";

export const Route = createFileRoute("/_site/_docs/docs/$slug")({
	loader: ({ params }) => {
		if (!getGuide(params.slug)) throw notFound();
	},
	head: ({ params }) =>
		getPageHead(
			`/docs/${params.slug}`,
			`${getGuide(params.slug)?.title ?? "Not found"} · Passui`,
			getGuide(params.slug)?.summary ?? "",
		),
	notFoundComponent: ComponentNotFound,
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	// a fresh page per guide: folds and local state start over
	return <GuidePage key={slug} slug={slug} />;
}
