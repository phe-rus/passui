import {
	createFileRoute,
	Outlet,
	retainSearchParams,
	stripSearchParams,
} from "@tanstack/react-router";
import { DocsLayout } from "@/features/catalog/components/docs-layout";
import {
	carriedSettings,
	docsSettingsDefaults,
	docsSettingsSchema,
} from "@/features/settings/types";

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
