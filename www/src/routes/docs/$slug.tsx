import { createFileRoute, notFound } from "@tanstack/react-router";
import { GuidePage } from "@/components/docs/guide-page";
import { DocNotFound } from "@/components/docs/not-found";
import { getGuide } from "@/features/guides/guides";
import { getPageHead } from "@/features/seo/head";

export const Route = createFileRoute("/docs/$slug")({
	loader: ({ params }) => {
		if (!getGuide(params.slug)) throw notFound();
	},
	head: ({ params }) => {
		const guide = getGuide(params.slug);
		return getPageHead(
			`/docs/${params.slug}`,
			`${guide?.title ?? "Not found"} · Passui`,
			guide?.summary ?? "",
		);
	},
	notFoundComponent: DocNotFound,
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	return <GuidePage key={slug} slug={slug} />;
}
