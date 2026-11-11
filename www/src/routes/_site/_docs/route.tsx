import { DocsLayout } from "@/domains/catalog/views/docs-layout";
import {
	carriedSettings,
	docsSettingsDefaults,
	docsSettingsSchema,
} from "@/domains/settings";
import {
	Outlet,
	createFileRoute,
	retainSearchParams,
	stripSearchParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_site/_docs")({
	validateSearch: docsSettingsSchema,
	search: {
		middlewares: [
			retainSearchParams([...carriedSettings]),
			stripSearchParams(docsSettingsDefaults),
		],
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<DocsLayout>
			<Outlet />
		</DocsLayout>
	);
}
