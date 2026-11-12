import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocView } from "@/components/docs/doc-view";
import { DocNotFound } from "@/components/docs/not-found";
import { loadComponentPage } from "@/features/components/load";
import { getMeta } from "@/features/components/registry";
import { getPageHead } from "@/lib/seo";

export const Route = createFileRoute("/docs/components/$slug")({
	loader: async ({ params }) => {
		const page = await loadComponentPage(params.slug);
		if (!page) throw notFound();
		return page;
	},
	head: ({ params }) => {
		const meta = getMeta(params.slug);
		return getPageHead(
			`/docs/components/${params.slug}`,
			`${meta?.name ?? "Not found"} · Passui`,
			meta?.summary ?? "",
		);
	},
	notFoundComponent: DocNotFound,
	component: RouteComponent,
});

function RouteComponent() {
	const { meta, code } = Route.useLoaderData();
	return <DocView key={meta.slug} meta={meta} code={code} />;
}
